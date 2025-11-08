import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { MessageSquare } from 'lucide-react';

interface Message {
  id: string | number;
  type: 'detected' | 'user' | 'sign-animation' | 'error' | string;
  content: string;
  timestamp: number | string;
  confidence?: number;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex p-4 bg-gray-100 rounded-2xl mb-4">
            <MessageSquare className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No translations yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Start signing or typing to see translations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin space-y-4 pb-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
