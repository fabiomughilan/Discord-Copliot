import axios from 'axios';
import { log } from '../utils/logger.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export interface KnowledgeResult {
  text: string;
  score: number;
  filename: string;
}

export async function queryKnowledgeBase(query: string): Promise<KnowledgeResult[]> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/bot`, {
      action: 'query_knowledge',
      query,
    });
    
    return response.data.results || [];
  } catch (error) {
    log.error('Failed to query knowledge base', error);
    return [];
  }
}

export function formatKnowledgeForAI(results: KnowledgeResult[]): string {
  if (results.length === 0) {
    return '';
  }

  let formatted = '\n\nRelevant knowledge from uploaded documents:\n';
  results.forEach((result, index) => {
    formatted += `\n[${index + 1}] From "${result.filename}" (relevance: ${(result.score * 100).toFixed(1)}%):\n`;
    formatted += `${result.text}\n`;
  });
  
  return formatted;
}
