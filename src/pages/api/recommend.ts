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
      `You are RoofusAI, an AI assistant whose goal is to help users identify their buy box by asking for feedback about properties.`
    );

    listingFeedbackForUser.forEach((listingFeedback) => {
      openAiPromptBuilder.addUserMessage(
        `Feedback for property with id ${listingFeedback.mlsListingId}: ${listingFeedback.feedback}.`
      );
    });

    openAiPromptBuilder.addUserMessage(
      `Recommend the best potential investment property for me from the provided dataset based on my feedback and criteria.
    
      My criteria:
      - Should be in the ${market} market.

      If you can't find a property that matches my criteria, pick a random property.

      Respond in JSON format with the following fields:
        - id: The ID of the recommended property.
        - explanation: An explanation as to why this property was recommended in a ${tone} tone. Don't include any document references.
        - confidence: A confidence score (0-100) on how confident you are that you understand the type of property the user is looking for.
        - buyBoxOverview: An overview of the user's buy box as you understand it.`
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
