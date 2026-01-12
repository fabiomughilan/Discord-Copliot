'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: string;
  role: string;
  content: string;
  authorName: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  channelId: string;
  messages: Message[];
  runningSummary: string | null;
  updatedAt: string;
}

export default function MemoryViewer() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedConv, setExpandedConv] = useState<string | null>(null);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/memory');
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleReset = async (channelId: string) => {
    if (!confirm('Are you sure you want to reset the memory for this channel?')) {
      return;
    }

    try {
      const response = await fetch(`/api/memory?channelId=${channelId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchConversations();
      }
    } catch (error) {
      console.error('Failed to reset memory:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="card fade-in">
        <div className="text-secondary">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="card fade-in">
      <h2 className="text-xl font-bold mb-4">Conversation Memory</h2>
      <p className="text-secondary text-sm mb-4">
        View and manage conversation history for each channel. Resetting will clear all messages and context.
      </p>
      
      {conversations.length === 0 ? (
        <div className="text-secondary text-sm">
          No conversations yet. The bot will create conversations as it interacts with users.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="card-glass"
              style={{ padding: '16px' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold">Channel ID: {conv.channelId}</div>
                  <div className="text-sm text-secondary">
                    {conv.messages.length} messages • Last updated:{' '}
                    {new Date(conv.updatedAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      setExpandedConv(expandedConv === conv.id ? null : conv.id)
                    }
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    {expandedConv === conv.id ? 'Hide' : 'View'}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReset(conv.channelId)}
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              {expandedConv === conv.id && (
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  {conv.runningSummary && (
                    <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                      <div className="text-sm font-bold mb-2">Running Summary:</div>
                      <div className="text-sm text-secondary">{conv.runningSummary}</div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-4">
                    {conv.messages.slice(0, 5).map((msg) => (
                      <div key={msg.id} className="text-sm">
                        <div className="font-bold">
                          {msg.role === 'user' ? msg.authorName : 'Assistant'}
                        </div>
                        <div className="text-secondary">{msg.content}</div>
                        <div className="text-tertiary text-xs mt-1">
                          {new Date(msg.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
