'use client';

import { useState } from 'react';

interface ChannelManagerProps {
  initialChannels: string[];
  onSave: (channels: string[]) => Promise<void>;
}

export default function ChannelManager({
  initialChannels,
  onSave,
}: ChannelManagerProps) {
  const [channels, setChannels] = useState<string[]>(initialChannels);
  const [newChannel, setNewChannel] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const addChannel = () => {
    if (newChannel.trim() && !channels.includes(newChannel.trim())) {
      setChannels([...channels, newChannel.trim()]);
      setNewChannel('');
    }
  };

  const removeChannel = (channelId: string) => {
    setChannels(channels.filter(c => c !== channelId));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      await onSave(channels);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Failed to save channels:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card fade-in">
      <h2 className="text-xl font-bold mb-4">Allowed Channels</h2>
      <p className="text-secondary text-sm mb-4">
        Add Discord channel IDs where the bot is allowed to respond. The bot will also respond when mentioned in any channel.
      </p>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className="input"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addChannel()}
          placeholder="Enter channel ID (e.g., 1234567890)"
        />
        <button className="btn btn-secondary" onClick={addChannel}>
          Add Channel
        </button>
      </div>
      
      <div className="flex flex-col gap-4 mb-4">
        {channels.length === 0 ? (
          <div className="text-secondary text-sm">
            No channels added yet. The bot will only respond when mentioned.
          </div>
        ) : (
          channels.map((channelId) => (
            <div
              key={channelId}
              className="flex items-center justify-between p-3 bg-tertiary rounded-lg"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <code className="text-sm">{channelId}</code>
              <button
                className="btn-danger"
                onClick={() => removeChannel(channelId)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div>
          {saveStatus === 'success' && (
            <span className="text-success text-sm">✓ Saved successfully</span>
          )}
          {saveStatus === 'error' && (
            <span className="text-error text-sm">✗ Failed to save</span>
          )}
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Channels'}
        </button>
      </div>
    </div>
  );
}
