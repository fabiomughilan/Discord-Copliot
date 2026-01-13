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
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p className="text-secondary" style={{ marginTop: '16px' }}>Loading Dashboard...</p>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  const tabs = [
    { id: 'instructions', label: 'System Instructions', icon: '⚙️' },
    { id: 'channels', label: 'Allowed Channels', icon: '📢' },
    { id: 'memory', label: 'Conversation Memory', icon: '💭' },
    { id: 'knowledge', label: 'Knowledge Base', icon: '📚' },
  ];

  return (
    <div className="dashboard">
      {/* Enhanced Header */}
      <header className="dashboard-header glass">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo-section">
                <div className="logo-icon">🤖</div>
                <div>
                  <h1 className="dashboard-title">Discord Copilot</h1>
                  <p className="dashboard-subtitle">AI Agent Control Center</p>
                </div>
              </div>
            </div>
            
            <div className="header-right">
              <div className="status-badge">
                <span className="status-label">Status</span>
                <span className={`status-indicator ${config.isActive ? 'active' : 'inactive'}`}>
                  <span className="status-dot"></span>
                  {config.isActive ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container dashboard-content">
        {/* Enhanced Tabs */}
        <div className="tabs-container glass">
          <div className="tabs-wrapper">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content with Animation */}
        <div className="tab-content">
          {activeTab === 'instructions' && (
            <div className="fade-in">
              <SystemInstructionsEditor
                initialInstructions={config.systemInstructions}
                onSave={(instructions) => updateConfig({ systemInstructions: instructions })}
              />
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="fade-in">
              <ChannelManager
                initialChannels={config.allowedChannels}
                onSave={(channels) => updateConfig({ allowedChannels: channels })}
              />
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="fade-in">
              <MemoryViewer />
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="fade-in">
              <KnowledgeUploader />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .dashboard-header {
          padding: 20px 0;
          margin-bottom: 32px;
          border-radius: 0;
          border-left: none;
          border-right: none;
          border-top: none;
          backdrop-filter: blur(20px);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .header-left {
          flex: 1;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logo-icon {
          font-size: 48px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 4px 0 0 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-label {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-indicator.active .status-dot {
          background: var(--success);
          box-shadow: 0 0 12px var(--success);
        }

        .status-indicator.inactive .status-dot {
          background: var(--error);
        }

        .status-indicator.active {
          color: var(--success);
        }

        .status-indicator.inactive {
          color: var(--error);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dashboard-content {
          padding-bottom: 48px;
        }

        .tabs-container {
          margin-bottom: 32px;
          padding: 8px;
          border-radius: 16px;
        }

        .tabs-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 8px;
        }

        .tab-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .tab-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tab-button:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .tab-button.active {
          color: white;
          border-color: var(--primary);
          background: rgba(var(--primary-rgb), 0.1);
        }

        .tab-button.active::before {
          opacity: 0.1;
        }

        .tab-icon {
          font-size: 20px;
          position: relative;
          z-index: 1;
        }

        .tab-label {
          position: relative;
          z-index: 1;
        }

        .tab-content {
          animation: fadeIn 0.4s ease-out;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
          }

          .tabs-wrapper {
            grid-template-columns: 1fr;
          }

          .dashboard-title {
            font-size: 24px;
          }

          .logo-icon {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
}
