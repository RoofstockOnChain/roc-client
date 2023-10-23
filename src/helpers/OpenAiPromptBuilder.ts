import { ChatMessage } from '@azure/openai';

export class OpenAiPromptBuilder {
  private chatMessages: ChatMessage[] = [];

  public addMessages(messages: ChatMessage[]): void {
    this.chatMessages.push(...messages);
  }

  public addSystemMessage(message: string): void {
    this.chatMessages.push({
      role: 'system',
      content: message,
    });
  }

  public addUserMessage(message: string): void {
    this.chatMessages.push({
      role: 'user',
      content: message,
    });
  }

  public generateMessages(): ChatMessage[] {
    return this.chatMessages;
  }
}
