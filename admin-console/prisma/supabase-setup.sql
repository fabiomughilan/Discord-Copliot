-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create function for similarity search
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 3
)
RETURNS TABLE (
  id text,
  content text,
  filename text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.content,
    kd.filename,
    1 - (dc.embedding <=> query_embedding) as similarity
  FROM "DocumentChunk" dc
  JOIN "KnowledgeDocument" kd ON dc."documentId" = kd.id
  WHERE dc.embedding IS NOT NULL
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create index for faster vector similarity search
CREATE INDEX IF NOT EXISTS document_chunk_embedding_idx 
ON "DocumentChunk" 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
