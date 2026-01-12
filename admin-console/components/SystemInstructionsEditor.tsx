'use client';

import { useState } from 'react';

interface SystemInstructionsEditorProps {
  initialInstructions: string;
  onSave: (instructions: string) => Promise<void>;
}

export default function SystemInstructionsEditor({
  initialInstructions,
  onSave,
}: SystemInstructionsEditorProps) {
  const [instructions, setInstructions] = useState(initialInstructions);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      await onSave(instructions);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Failed to save instructions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card fade-in">
      <h2 className="text-xl font-bold mb-4">System Instructions</h2>
      <p className="text-secondary text-sm mb-4">
        Define the bot's personality, tone, and rules. This will be used as the system prompt for all AI responses.
      </p>
      
      <textarea
        className="input"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="You are a helpful assistant that..."
        style={{ minHeight: '300px' }}
      />
      
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
          {isSaving ? 'Saving...' : 'Save Instructions'}
        </button>
      </div>
    </div>
  );
}
