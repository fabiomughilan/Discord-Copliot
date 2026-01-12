import Groq from 'groq-sdk';
import { log } from '../utils/logger.js';
import { getConversationContext, formatContextForAI } from './conversationService.js';
import { queryKnowledgeBase, formatKnowledgeForAI } from './ragService.js';

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqClient;
}

export async function generateResponse(
  systemInstructions: string,
  userMessage: string,
  channelId: string
): Promise<string> {
  try {
    // Get conversation context
    const context = await getConversationContext(channelId);
    const conversationHistory = formatContextForAI(context);

    // Query knowledge base
    const knowledgeResults = await queryKnowledgeBase(userMessage);
    const knowledgeContext = formatKnowledgeForAI(knowledgeResults);

    // Build messages for Groq
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: systemInstructions + knowledgeContext,
      },
    ];

    // Add conversation history if available
    if (conversationHistory) {
      messages.push({
        role: 'system',
        content: `Context from previous conversation:\n${conversationHistory}`,
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    log.info('Generating AI response with Groq', {
      messageCount: messages.length,
      hasKnowledge: knowledgeResults.length > 0,
      hasHistory: context.messages.length > 0,
    });

    // Generate response using Groq
    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    
    return response;
  } catch (error) {
    log.error('Failed to generate AI response', error);
    return 'I apologize, but I encountered an error while processing your request. Please try again later.';
  }
}
