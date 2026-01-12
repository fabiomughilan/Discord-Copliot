import axios from 'axios';
import { log } from '../utils/logger.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export interface Message {
  id: string;
  role: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: string;
}

export interface ConversationContext {
  messages: Message[];
  summary: string | null;
}

export async function storeMessage(
  channelId: string,
  role: 'user' | 'assistant',
  content: string,
  authorId: string,
  authorName: string
): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/api/bot`, {
      action: 'store_message',
      channelId,
      role,
      content,
      authorId,
      authorName,
    });
  } catch (error) {
    log.error('Failed to store message', error);
  }
}

export async function getConversationContext(channelId: string): Promise<ConversationContext> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/bot`, {
      action: 'get_context',
      channelId,
    });
    
    return response.data;
  } catch (error) {
    log.error('Failed to get conversation context', error);
    return { messages: [], summary: null };
  }
}

export function formatContextForAI(context: ConversationContext): string {
  if (context.messages.length === 0) {
    return '';
  }

  let formatted = '';
  
  if (context.summary) {
    formatted += `Previous conversation summary: ${context.summary}\n\n`;
  }
  
  formatted += 'Recent messages:\n';
  context.messages.forEach(msg => {
    formatted += `${msg.role === 'user' ? msg.authorName : 'Assistant'}: ${msg.content}\n`;
  });
  
  return formatted;
}
