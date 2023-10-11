import { NextApiRequest, NextApiResponse } from 'next';
import { AzureKeyCredential, ChatMessage, OpenAIClient } from '@azure/openai';
import { config } from '@/config';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    messages = [],
  }: {
    market: string;
    messages: ChatMessage[];
  } = JSON.parse(request.body);

  response.status(200).json({
    messages: await getOpenAiResponse(messages),
  });
};

const getOpenAiResponse = async (
  messages: ChatMessage[]
): Promise<ChatMessage[]> => {
  const openAiClient = new OpenAIClient(
    config.azureOpenAiEndpoint,
    new AzureKeyCredential(config.azureOpenAiApiKey)
  );

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
              inScope: false,
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

  if (choices.length > 0) {
    messages.push({ role: 'assistant', content: choices[0] });
  }
  return messages;
};

export default handler;
