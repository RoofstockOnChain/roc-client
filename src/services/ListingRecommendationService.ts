import { OpenAiPromptBuilder } from '@/helpers/OpenAiPromptBuilder';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { config } from '@/config';

export const getListingRecommendations = async (
  market?: string,
  feedback: string = 'Listed for about $200K with 3 bedrooms and 2 bathrooms.'
) => {
  const openAiClient = new OpenAIClient(
    config.azureOpenAiEndpoint,
    new AzureKeyCredential(config.azureOpenAiApiKey)
  );

  const openAiPromptBuilder = new OpenAiPromptBuilder();
  openAiPromptBuilder.addSystemMessage(
    `You are RoofusAI, an AI assistant whose goal is to help users identify their buy box by asking for feedback about properties.`
  );

  openAiPromptBuilder.addUserMessage(`
    Recommend some properties for me from the provided dataset.
    
    My criteria:
      - Should be in the ${market} market.

    Respond in only JSON format with the following fields:
      - listingIds - an array of 12 property ids sorted by the one I am most likely to be interested in.
      - explanation - an overview of what you think my buy box is based on my feedback.
  `);

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

  const listingRecommendations = await Promise.all(
    completion.choices
      .filter((x) => x.message?.content)
      .map(async (choice) => {
        console.log(choice.message!.content!);
        return JSON.parse(choice.message!.content!) as {
          listingIds: string[];
          explanation: string;
        };
      })
  );

  return listingRecommendations[0];
};
