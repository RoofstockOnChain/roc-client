import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/config';
import { listings } from '@/data/listings';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { OpenAiPromptBuilder } from '@/helpers/OpenAiPromptBuilder';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const openAiClient = new OpenAIClient(
    config.azureOpenAiEndpoint,
    new AzureKeyCredential(config.azureOpenAiApiKey)
  );

  const requestBody = JSON.parse(request.body);
  const listingFeedbackForUser = (requestBody.listingFeedbackForUser ??
    []) as ListingFeedback[];
  const market = requestBody.market;
  const desiredPrice = requestBody.desiredPrice;
  const bedrooms = requestBody.bedrooms;
  const bathrooms = requestBody.bathrooms;
  const mlsListingIdsToExclude = (requestBody.mlsListingIdsToExclude ??
    []) as string[];
  const tone = (requestBody.tone ?? 'professional') as string;

  var openAiPromptBuilder = new OpenAiPromptBuilder();
  openAiPromptBuilder.addSystemMessage(
    'You are RoofusAI, an AI assistant whose goal is to help users find the best investment property from the dataset based on their feedback.'
  );

  listingFeedbackForUser.forEach((listingFeedback: ListingFeedback) => {
    openAiPromptBuilder.addUserMessage(
      `Feedback for  id ${listingFeedback.mlsListingId}: ${listingFeedback.feedback}`
    );
  });

  if (mlsListingIdsToExclude.length > 0) {
    const commaSeparatedMlsListingIds = mlsListingIdsToExclude.join(', ');
    openAiPromptBuilder.addUserMessage(
      `Don't recommend properties with the following ids: ${commaSeparatedMlsListingIds}`
    );
  }

  openAiPromptBuilder.addUserMessage(
    `Recommend the best single investment property for me from the dataset. Property should be in the ${market} market. Property should be listed for about $${desiredPrice}. Property should have about ${bedrooms} bedrooms. Property should have about ${bathrooms} bathrooms.

    \`\`\`
    Format the response in only JSON with the following structure:
    {
      "id": "12345",
      "explanation: "The property at 342 Rare St looks like it would be a good fit for you for an investment property. It has 3 bedrooms and 4 bathrooms. It is larger than 456 Bell Ave and thus fits what you are looking for."
    }
    \`\`\`
    `
  );

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
  if (
    completion?.choices.length > 0 &&
    completion?.choices[0].message?.content
  ) {
    try {
      const listingRecommendation = JSON.parse(
        completion.choices[0].message.content
      );
      const recommendedMlsListingId = listingRecommendation.id;
      const recommendedMlsListing = getListingByMlsListingId(
        recommendedMlsListingId
      );

      response.status(200).json({
        listing: recommendedMlsListing,
        explanation: listingRecommendation.explanation,
      });
    } catch (ex) {
      response.status(500).json({
        openAiRequest: messages,
        openAiResponse: completion?.choices[0].message?.content,
      });
    }
  }
};

const getListingByMlsListingId = (mlsListingId: string) => {
  return listings.find((x) => x.mlsListingId == mlsListingId);
};

export default handler;

type ListingFeedback = {
  mlsListingId: string;
  feedback: string;
};
