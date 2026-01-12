import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { prisma } from './prisma';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

/**
 * Query knowledge base using pgvector similarity search
 */
export async function queryKnowledge(query: string, topK: number = 3) {
  try {
    const { generateQueryEmbedding } = await import('./embeddings');
    
    // Generate embedding for the query using Hugging Face
    const queryEmbedding = await generateQueryEmbedding(query);
    
    // Pad to 1536 dimensions to match schema
    const paddedEmbedding = [...queryEmbedding];
    while (paddedEmbedding.length < 1536) {
      paddedEmbedding.push(0);
    }

    // Query Supabase using pgvector similarity search
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: paddedEmbedding,
      match_threshold: 0.7,
      match_count: topK,
    });

    if (error) {
      console.error('Error querying knowledge base:', error);
      return [];
    }

    return data?.map((match: any) => ({
      text: match.content,
      score: match.similarity,
      filename: match.filename,
    })) || [];
  } catch (error) {
    console.error('Error querying knowledge base:', error);
    return [];
  }
}

/**
 * Alternative: Query using Prisma raw SQL with pgvector
 */
export async function queryKnowledgeWithPrisma(queryEmbedding: number[], topK: number = 3) {
  try {
    const results = await prisma.$queryRaw<Array<{
      id: string;
      content: string;
      filename: string;
      similarity: number;
    }>>`
      SELECT 
        dc.id,
        dc.content,
        kd.filename,
        1 - (dc.embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector) as similarity
      FROM "DocumentChunk" dc
      JOIN "KnowledgeDocument" kd ON dc."documentId" = kd.id
      WHERE dc.embedding IS NOT NULL
      ORDER BY dc.embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector
      LIMIT ${topK}
    `;

    return results.map(result => ({
      text: result.content,
      score: result.similarity,
      filename: result.filename,
    }));
  } catch (error) {
    console.error('Error querying knowledge with Prisma:', error);
    return [];
  }
}
