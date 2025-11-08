import React from 'react';
import MessageList from '../messages/MessageList';
import { useTranslation } from '../../contexts/TranslationContext';
import { Trash2 } from 'lucide-react';

interface Message {
  id: string | number;
  type: 'detected' | 'user' | 'sign-animation' | 'error' | string;
  content: string;
  timestamp: number | string;
  confidence?: number;
}

interface TranslationContextType {
  messages: Message[];
  clearMessages: () => void;
}

const TranslationPanel: React.FC = () => {
  const { messages, clearMessages } = useTranslation() as TranslationContextType;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Translation Feed</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time translations appear here</p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear all messages"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-6 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Footer Status */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">
            AI Translation Active • {messages.length} message
            {messages.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;
