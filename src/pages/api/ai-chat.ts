import { NextApiRequest, NextApiResponse } from 'next';
import { AzureKeyCredential, ChatMessage, OpenAIClient } from '@azure/openai';
import { config as rocConfig } from '@/config';

export const config = {
  maxDuration: 30,
};

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
    rocConfig.azureOpenAiEndpoint,
    new AzureKeyCredential(rocConfig.azureOpenAiApiKey)
  );

  const completion = await openAiClient.getChatCompletions(
    rocConfig.azureOpenAiDeploymentId,
    messages,
    {
      azureExtensionOptions: {
        extensions: [
          {
            type: 'AzureCognitiveSearch',
            parameters: {
              endpoint: rocConfig.azureSearchServiceEndpoint,
              key: rocConfig.azureSearchServiceApiKey,
              indexName: rocConfig.azureSearchServiceIndex,
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

  if (choices.length > 0) {
    messages.push({ role: 'assistant', content: choices[0] });
  }
  return messages;
};

export default handler;
