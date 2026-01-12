import { prisma } from './prisma';

const pdfParse = require('pdf-parse-fork');

// Hugging Face API configuration
const HF_API_URL = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

interface ChunkMetadata {
  text: string;
  filename: string;
  chunkIndex: number;
}

/**
 * Split text into chunks of approximately maxChunkSize characters
 */
export function chunkText(text: string, maxChunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split('\n\n');
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

/**
 * Generate embeddings using Hugging Face API
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (const text of texts) {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        options: { wait_for_model: true }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const embedding = await response.json();
    embeddings.push(embedding);
  }

  return embeddings;
}

/**
 * Generate single embedding for query
 */
export async function generateQueryEmbedding(query: string): Promise<number[]> {
  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: query,
      options: { wait_for_model: true }
    }),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Store document chunks in Supabase with pgvector
 */
export async function storeDocumentInSupabase(
  documentId: string,
  filename: string,
  chunks: string[]
): Promise<void> {
  const embeddings = await generateEmbeddings(chunks);

  // Store chunks with embeddings in database
  for (let i = 0; i < chunks.length; i++) {
    // Pad embedding to 1536 dimensions (pgvector schema expects this)
    const paddedEmbedding = [...embeddings[i]];
    while (paddedEmbedding.length < 1536) {
      paddedEmbedding.push(0);
    }

    await prisma.$executeRaw`
      INSERT INTO "DocumentChunk" (id, "documentId", content, embedding, "chunkIndex", "createdAt")
      VALUES (
        gen_random_uuid()::text,
        ${documentId},
        ${chunks[i]},
        ${`[${paddedEmbedding.join(',')}]`}::vector,
        ${i},
        NOW()
      )
    `;
  }
}

/**
 * Process PDF file: extract text, chunk, embed, and store
 */
export async function processPDFDocument(
  buffer: Buffer,
  filename: string
): Promise<{ chunkCount: number; documentId: string }> {
  // Extract text from PDF
  const text = await extractTextFromPDF(buffer);

  // Split into chunks
  const chunks = chunkText(text);

  // Create document record
  const document = await prisma.knowledgeDocument.create({
    data: {
      filename,
      chunkCount: chunks.length,
    },
  });

  // Store chunks with embeddings in Supabase
  await storeDocumentInSupabase(document.id, filename, chunks);

  return {
    chunkCount: chunks.length,
    documentId: document.id,
  };
}
