import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/config';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { OpenAiPromptBuilder } from '@/helpers/OpenAiPromptBuilder';
import { getListing } from '@/services/ListingService';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const openAiClient = new OpenAIClient(
      config.azureOpenAiEndpoint,
      new AzureKeyCredential(config.azureOpenAiApiKey)
    );

    const {
      market,
      desiredPrice,
      bedrooms,
      bathrooms,
      tone = 'professional',
      listingFeedbackForUser = [],
    }: {
      market: string;
      desiredPrice: number;
      bedrooms: number;
      bathrooms: number;
      mlsListingIdsToExclude: string[];
      tone: 'professional' | 'comedic';
      listingFeedbackForUser: ListingFeedback[];
    } = JSON.parse(request.body);

    const openAiPromptBuilder = new OpenAiPromptBuilder();
    openAiPromptBuilder.addSystemMessage(
      `You are RoofusAI, an AI assistant whose goal is to help users find the best investment property from the provided dataset based on their feedback.`
    );

    listingFeedbackForUser.forEach((listingFeedback) => {
      openAiPromptBuilder.addUserMessage(
        `Feedback for property with id ${listingFeedback.mlsListingId}: ${listingFeedback.feedback}.`
      );
    });

    openAiPromptBuilder.addUserMessage(
      `Recommend a single investment property for me from the provided dataset that I might be interested in purchasing.
    
      My ideal criteria:
      - Should be in the ${market} market.
      - Should be listed for about $${desiredPrice}.
      - Should have about ${bedrooms} bedrooms.
      - Should have about ${bathrooms} bathrooms.
      
      The recommended property does not need to match all of this criteria
      
      Don't recommend a property that I have already provided feedback for.
      
      Provide your response in only JSON object with the following fields:
        - id: The ID of the recommended property.
        - explanation: An explanation as to why this property was recommended in a ${tone} tone. Don't include any document references.
        - confidence: A confidence score (0-100) on how confident you are that you understand the type of property the user is looking for.
        - buyBoxOverview: An over of the user's buy box as you understand it.`
    );

    const schema = {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The ID of the recommended property',
        },
        explanation: {
          type: 'string',
          description: `An explanation as to why this property was recommended in a ${tone} tone. Don't include any document references.`,
        },
        confidence: {
          type: 'string',
          description:
            'A confidence score (0-100) on how confident you are that you understand the type of property the user is looking for.',
        },
        buyBoxOverview: {
          type: 'string',
          description: "An over of the user's buy box as you understand it.",
        },
      },
    };

    const messages = openAiPromptBuilder.generateMessages();
    const completion = await openAiClient.getChatCompletions(
      config.azureOpenAiDeploymentId,
      messages,
      {
        functions: [
          {
            name: 'formatResponse',
            description: 'Formats the response.',
            parameters: schema,
          },
        ],
        functionCall: { name: 'formatResponse' },
        azureExtensionOptions: {
          extensions: [
            {
              type: 'AzureCognitiveSearch',
              parameters: {
                endpoint: config.azureSearchServiceEndpoint,
                key: config.azureSearchServiceApiKey,
                indexName: config.azureSearchServiceIndex,
              },
            },
          ],
        },
      }
    );

    const recommendations = await Promise.all(
      completion.choices
        .filter((x) => x.message?.content)
        .map(async (choice) => {
          try {
            const listingRecommendation = JSON.parse(choice.message!.content!);
            const recommendedMlsListing = await getListing(
              listingRecommendation.id
            );
            return {
              listing: recommendedMlsListing,
              explanation: listingRecommendation.explanation,
              confidence: listingRecommendation.confidence,
              buyBoxOverview: listingRecommendation.buyBoxOverview,
            };
          } catch (ex) {
            response.status(500).json({
              openAiRequest: messages,
              openAiResponse: choice.message?.content,
            });
          }
        })
    );

    if (recommendations.length > 0) {
      response.status(200).json(recommendations[0]);
    } else {
      response.status(404).json({ message: 'No recommendation found.' });
    }
  } catch (ex) {
    response.status(500).json({ message: ex });
  }
};

export default handler;

type ListingFeedback = {
  mlsListingId: string;
  feedback: string;
};
