import { OpenAiPromptBuilder } from '@/helpers/OpenAiPromptBuilder';
import { AzureKeyCredential, ChatMessage, OpenAIClient } from '@azure/openai';
import { config } from '@/config';

export const getListingRecommendations = async (
  market?: string,
  criteria: string = 'Listed for about $200K with 3 bedrooms and 2 bathrooms.'
): Promise<{
  listingIds: string[];
  explanation: string;
  openAiRequestMessages: ChatMessage[];
  openAiResponse: string;
}> => {
  const openAiClient = new OpenAIClient(
    config.azureOpenAiEndpoint,
    new AzureKeyCredential(config.azureOpenAiApiKey)
  );

  const openAiPromptBuilder = new OpenAiPromptBuilder();
  openAiPromptBuilder.addSystemMessage(
    `You are RoofusAI, an AI assistant whose goal is to help users identify their buy box via text criteria.`
  );

  openAiPromptBuilder.addUserMessage(`Recommend some properties for me from the provided dataset of properties.
    
    My criteria:
      - Should be in the ${market} market.
      - ${criteria}

    Respond in only JSON format with the following fields:
      - listingIds - an array of property ids sorted by the one I am most likely to be interested in.
      - explanation - an overview of what you think my buy box is based on my feedback.`);

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

  const choices = completion.choices
    .filter((x) => x.message?.content)
    .map((choice) => {
      return choice.message!.content!;
    });

  try {
    const listingRecommendations = await Promise.all(
      choices.map((choice) => {
        const parsedContent = JSON.parse(choice);
        return {
          listingIds: parsedContent.listingIds,
          explanation: parsedContent.explanation,
          openAiRequestMessages: messages,
          openAiResponse: choice,
        };
      })
    );

    return listingRecommendations[0];
  } catch {
    // TODO: Remove this fallback
    return {
      listingIds: [
        '21945774',
        '21945133',
        '21945486',
        '21944662',
        '21942309',
        '21945182',
        '21945786',
        '21944946',
        '21945787',
        '21945844',
      ],
      explanation:
        'You are looking for a 3 bedroom, 2 bathroom property in Columbia, SC.',
      openAiRequestMessages: messages,
      openAiResponse: choices[0],
    };
  }
};
