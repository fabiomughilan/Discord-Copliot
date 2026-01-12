'use client';

import { useState, useEffect } from 'react';

interface KnowledgeDocument {
  id: string;
  filename: string;
  uploadedAt: string;
  chunkCount: number;
}

export default function KnowledgeUploader() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/knowledge/list');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      alert('Only PDF files are supported');
      return;
    }

    setIsUploading(true);
    setUploadProgress('Uploading file...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      setUploadProgress('Processing PDF and generating embeddings...');
      
      const response = await fetch('/api/knowledge/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadProgress('Upload successful!');
        await fetchDocuments();
        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
        setUploadProgress('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
      setUploadProgress('');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="card fade-in">
        <div className="text-secondary">Loading knowledge base...</div>
      </div>
    );
  }

  return (
    <div className="card fade-in">
      <h2 className="text-xl font-bold mb-4">Knowledge Base (RAG)</h2>
      <p className="text-secondary text-sm mb-4">
        Upload PDF documents to enhance the bot's knowledge. The bot will automatically retrieve relevant information from these documents when responding.
      </p>
      
      <div className="mb-6">
        <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
            style={{ display: 'none' }}
          />
          {isUploading ? 'Uploading...' : '📄 Upload PDF'}
        </label>
        
        {uploadProgress && (
          <div className="mt-3 text-sm text-secondary">{uploadProgress}</div>
        )}
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Uploaded Documents ({documents.length})</h3>
        
        {documents.length === 0 ? (
          <div className="text-secondary text-sm">
            No documents uploaded yet. Upload PDFs to enable RAG knowledge retrieval.
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="card-glass"
              style={{ padding: '16px' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">📄 {doc.filename}</div>
                  <div className="text-sm text-secondary">
                    {doc.chunkCount} chunks • Uploaded{' '}
                    {new Date(doc.uploadedAt).toLocaleString()}
                  </div>
                </div>
                
                <span className="badge badge-success">Active</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
