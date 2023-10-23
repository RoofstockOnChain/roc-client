import { OpenAiPromptBuilder } from '@/helpers/OpenAiPromptBuilder';
import { AzureKeyCredential, ChatMessage, OpenAIClient } from '@azure/openai';
import { config } from '@/config';

export const getListingRecommendations = async (
  chatMessages: ChatMessage[]
): Promise<{
  listingIds: string[];
  openAiResponse: string;
}> => {
  const openAiClient = new OpenAIClient(
    config.azureOpenAiEndpoint,
    new AzureKeyCredential(config.azureOpenAiApiKey)
  );

  const openAiPromptBuilder = new OpenAiPromptBuilder();
  openAiPromptBuilder.addMessages(chatMessages);
  openAiPromptBuilder.addUserMessage(
    'Recommend a list of property ids from the dataset based on the conversation.'
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
      listingIds: parsedChoice.listingIds,
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
    };
  }
};

const isValidChoice = (choice: string) => {
  try {
    const parsedChoice = JSON.parse(choice) as {
      listingIds: string[];
      explanation: string;
    };
    return parsedChoice?.listingIds?.length > 0 && parsedChoice?.explanation;
  } catch {}
  return false;
};

const parseValidatedChoice = (choice: string) => {
  return JSON.parse(choice) as {
    listingIds: string[];
    explanation: string;
  };
};

const hackChoice = (choice: string) => {
  // TODO: Hack the choice
  return choice;
};
