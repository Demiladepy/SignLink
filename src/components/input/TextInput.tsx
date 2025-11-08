import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import { signLanguageService } from '../../services/signLanguageService';

const TextInput = () => {
  const [text, setText] = useState('');
  const { addMessage, setIsProcessing, isProcessing } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const userText = text.trim();
    setText('');

    // Add user message
    addMessage('user', userText, { source: 'text' });

    setIsProcessing(true);
    try {
      // Call sign language API
      const result = await signLanguageService.textToSign(userText);

      addMessage('sign-animation', userText, {
        animation: result.animation,
        duration: result.duration,
      });
    } catch (err) {
      console.error('Translation error:', err?.response || err?.message || err);
      addMessage('error', 'Failed to generate sign animation.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message here..."
          rows={8}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <div
          className={`absolute bottom-3 right-3 text-xs ${
            text.length > 450 ? 'text-red-400' : 'text-gray-400'
          }`}
        >
          {text.length} characters
        </div>
      </div>

      <button
        type="submit"
        disabled={!text.trim() || isProcessing}
        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Converting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Convert to Sign Language
          </>
        )}
      </button>
    </form>
  );
};

export default TextInput;
