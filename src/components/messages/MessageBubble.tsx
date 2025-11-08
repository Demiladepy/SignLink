import React from 'react';
import { Camera, MessageSquare, AlertCircle } from 'lucide-react';
import Signanimation from '../animation/Signanimation';
import type { LucideIcon } from 'lucide-react';

interface Message {
  type: 'detected' | 'user' | 'sign-animation' | 'error' | string;
  content: string;
  timestamp: number | string;
  confidence?: number;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { type, content, timestamp, confidence } = message;

  const getConfig = () => {
    switch (type) {
      case 'detected':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: Camera as LucideIcon,
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
          label: 'Sign Detected',
          labelColor: 'text-blue-700',
        };
      case 'user':
        return {
          bg: 'bg-gray-50 border-gray-200',
          icon: MessageSquare as LucideIcon,
          iconColor: 'text-gray-600',
          iconBg: 'bg-gray-100',
          label: 'Your Message',
          labelColor: 'text-gray-700',
        };
      case 'sign-animation':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
          icon: null,
          label: 'Sign Animation',
          labelColor: 'text-blue-700',
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: AlertCircle as LucideIcon,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          label: 'Error',
          labelColor: 'text-red-700',
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          icon: null,
          label: 'System',
          labelColor: 'text-gray-700',
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div
      className={`border-2 ${config.bg} rounded-xl p-4 transition-all duration-200 hover:shadow-sm`}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`${config.iconBg} p-2 rounded-lg flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold ${config.labelColor}`}>
              {config.label}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(timestamp).toLocaleTimeString()}
            </span>
            {confidence !== undefined && (
              <span className="text-xs text-gray-500 ml-auto">
                {(confidence * 100).toFixed(0)}% confidence
              </span>
            )}
          </div>

          {type === 'sign-animation' ? (
            <Signanimation text={content} />
          ) : (
            <p className="text-gray-900">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
