import { EventBus } from '../core/EventBus';

export type ChatChannel = 'global' | 'guild' | 'private';

export interface ChatMessage {
  id: string;
  channel: ChatChannel;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: number;
}

export class ChatSystem {
  messages: ChatMessage[] = [];

  sendMessage(channel: ChatChannel, senderId: string, senderName: string, message: string) {
    const chatMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      channel,
      senderId,
      senderName,
      message,
      timestamp: Date.now()
    };
    this.messages.push(chatMessage);
    EventBus.emit('chat:message_sent', chatMessage);
    return chatMessage;
  }

  getMessages(channel: ChatChannel) {
    return this.messages.filter(m => m.channel === channel);
  }
}