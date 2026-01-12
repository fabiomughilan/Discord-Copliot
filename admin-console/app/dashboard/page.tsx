'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SystemInstructionsEditor from '@/components/SystemInstructionsEditor';
import ChannelManager from '@/components/ChannelManager';
import MemoryViewer from '@/components/MemoryViewer';
import KnowledgeUploader from '@/components/KnowledgeUploader';

interface BotConfig {
  systemInstructions: string;
  allowedChannels: string[];
  isActive: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('instructions');
  const [config, setConfig] = useState<BotConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = async (updates: Partial<BotConfig>) => {
    const response = await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updated = await response.json();
      setConfig(updated);
    } else {
      throw new Error('Failed to update config');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-secondary">Loading...</div>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header
        className="glass"
        style={{
          padding: '16px 0',
          marginBottom: '32px',
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
        }}
      >
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">🤖 Discord Copilot Admin</h1>
            <p className="text-secondary text-sm">Manage your AI agent</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary">Bot Status:</span>
              <span className={`badge ${config.isActive ? 'badge-success' : 'badge-error'}`}>
                {config.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container" style={{ paddingBottom: '48px' }}>
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            System Instructions
          </button>
          <button
            className={`tab ${activeTab === 'channels' ? 'active' : ''}`}
            onClick={() => setActiveTab('channels')}
          >
            Allowed Channels
          </button>
          <button
            className={`tab ${activeTab === 'memory' ? 'active' : ''}`}
            onClick={() => setActiveTab('memory')}
          >
            Conversation Memory
          </button>
          <button
            className={`tab ${activeTab === 'knowledge' ? 'active' : ''}`}
            onClick={() => setActiveTab('knowledge')}
          >
            Knowledge Base
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'instructions' && (
          <SystemInstructionsEditor
            initialInstructions={config.systemInstructions}
            onSave={(instructions) => updateConfig({ systemInstructions: instructions })}
          />
        )}

        {activeTab === 'channels' && (
          <ChannelManager
            initialChannels={config.allowedChannels}
            onSave={(channels) => updateConfig({ allowedChannels: channels })}
          />
        )}

        {activeTab === 'memory' && <MemoryViewer />}

        {activeTab === 'knowledge' && <KnowledgeUploader />}
      </div>
    </div>
  );
}
