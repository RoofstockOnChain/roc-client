import { useState } from 'react';
import { ChatMessage } from '@azure/openai';

export const useAiChat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello, I am RoofusAI, your AI powered real estate assistant. Tell me what you are looking for.',
    },
  ]);

  const addUserMessage = async (message: string) => {
    setLoading(true);
    const response = await fetch(`/api/ai-chat`, {
      method: 'POST',
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: message }],
      }),
    });
    const aiChatMessages = (await response.json()) as {
      messages: ChatMessage[];
    };
    setMessages(aiChatMessages.messages);
    setLoading(false);
  };

  return {
    loading,
    messages,
    addUserMessage,
  };
};
