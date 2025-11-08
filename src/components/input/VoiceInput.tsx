import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { useTranslation } from '../../contexts/TranslationContext';
import signlanguage  from '../../services/signlanguage';

const VoiceInput: React.FC = () => {
  const [text, setText] = useState<string>('');
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeech();
  const { addMessage, setIsProcessing } = useTranslation();

  // ✅ FIXED: Update text when transcript changes
  useEffect(() => {
    if (transcript && isListening) {
      setText(transcript);
    }
  }, [transcript, isListening]);

  // ✅ FIXED: Simple toggle for voice input
  const handleVoiceInput = (): void => {
    if (isListening) {
      stopListening();
      // Keep the final transcript in the text field
    } else {
      resetTranscript(); // Clear previous transcript
      startListening();
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!text.trim()) return;

    const userText = text.trim();
    setText('');
    resetTranscript();
    stopListening();

    addMessage('user', userText, { source: 'voice' });
    setIsProcessing(true);

    try {
      const result = await signlanguage.textToSign(userText);
      addMessage('sign-animation', userText, {
        duration: result.duration,
      });
    } catch (err) {
      console.error('Translation error:', err);
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
          placeholder="Speak or type your message..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isListening}
        />
        {isListening && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Listening
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          {isListening ? 'Stop Recording' : 'Start Voice Input'}
        </button>

        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default VoiceInput;