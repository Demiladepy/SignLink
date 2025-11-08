import React, { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';

type Message = {
  role: 'user' | 'sign-animation' | 'error';
  content: string;
  meta?: Record<string, any>;
};

type TranslationContextType = {
  messages: Message[];
  addMessage: (role: Message['role'], content: string, meta?: Record<string, any>) => void;
  mode: string;
  setMode: (mode: string) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<string>('text-to-sign');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const addMessage = (role: Message['role'], content: string, meta?: Record<string, any>) => {
    setMessages((prev) => [...prev, { role, content, meta }]);
  };

  return (
    <TranslationContext.Provider
      value={{ messages, addMessage, mode, setMode, isProcessing, setIsProcessing }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationContext;
