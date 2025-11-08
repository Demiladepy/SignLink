import React, { useState } from 'react';
import { X, Sparkles, Check, Zap } from 'lucide-react';

interface UicustomizerProps {
  onClose: () => void;
}

const Uicustomizer: React.FC<UicustomizerProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [appliedPrompts, setAppliedPrompts] = useState<string[]>([]);

  const suggestions: string[] = [
    'Make text larger for better readability',
    'Add a dark mode toggle',
    'Translate interface to Spanish',
    'Increase button sizes',
    'Add high contrast mode',
    'Enable keyboard shortcuts',
  ];

  const handleApply = async (): Promise<void> => {
    if (!prompt.trim()) return;

    setIsApplying(true);

    // Simulate AI processing delay
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));

    setAppliedPrompts((prev) => [...prev, prompt]);
    setPrompt('');
    setIsApplying(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI UI Customization</h3>
              <p className="text-sm text-gray-500">
                Describe how you'd like to customize the interface
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Input */}
        <div className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') handleApply();
              }}
              placeholder="e.g., 'Make buttons larger' or 'Add dark mode'"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleApply}
              disabled={!prompt.trim() || isApplying}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              {isApplying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Apply
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setPrompt(suggestion)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Applied Prompts */}
        {appliedPrompts.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-sm font-semibold text-green-900">
                Applied Customizations:
              </p>
            </div>
            <div className="space-y-2">
              {appliedPrompts.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-green-800"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uicustomizer;
