import { OpenAiPromptBuilder } from '@/helpers/OpenAiPromptBuilder';
import { AzureKeyCredential, ChatMessage, OpenAIClient } from '@azure/openai';
import { config } from '@/config';

export const getListingRecommendations = async (
  market: string,
  chatMessages: ChatMessage[]
): Promise<{
  listingIds: string[];
  openAiMessages: ChatMessage[];
  openAiResponse: string;
}> => {
  const openAiClient = new OpenAIClient(
    config.azureOpenAiEndpoint,
    new AzureKeyCredential(config.azureOpenAiApiKey)
  );

  const openAiPromptBuilder = new OpenAiPromptBuilder();
  openAiPromptBuilder.addMessages(chatMessages);
  openAiPromptBuilder.addUserMessage(`Return a list of property ids from the properties you mentioned in our conversation.

Return the data as property ids that are comma separated. Don't include any other text in the response.`);

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
              inScope: true,
              strictness: 1,
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

  const listingRecommendations = choices.map((choice) => {
    const parsedChoice = parseChoice(choice);
    return {
      listingIds: parsedChoice,
      openAiMessages: messages,
      openAiResponse: choice,
    };
  });

  return listingRecommendations[0];
};

const parseChoice = (choice: string) => {
  const hackedChoice = hackChoice(choice);
  if (isValidChoice(hackedChoice)) {
    return parseValidatedChoice(hackedChoice);
  } else {
    // TODO: Remove this fallback
    return [
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
    ];
  }
};

const isValidChoice = (choice: string) => {
  try {
    const parsedChoice = choice.split(',');
    return parsedChoice?.length > 1;
  } catch {}
  return false;
};

const parseValidatedChoice = (choice: string): string[] => {
  return choice.split(',').map((x) => x.trim());
};

const hackChoice = (choice: string) => {
  // TODO: Hack the choice
  return choice;
};
