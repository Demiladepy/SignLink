import React from 'react';
import { Volume2 } from 'lucide-react';

interface SignanimationProps {
  text: string;
}

const Signanimation: React.FC<SignanimationProps> = ({ text }) => {
  const words = text.split(' ');

  const speakText = (): void => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported in this browser.');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border-2 border-blue-100">
      <div className="text-center space-y-4">
        {/* Animated Hand Icon */}
        <div className="relative inline-block">
          <div className="text-7xl animate-bounce">🤟</div>
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {words.length}
          </div>
        </div>

        {/* Text Display */}
        <div className="space-y-2">
          <p className="text-gray-600 text-sm font-medium">Signing:</p>
          <p className="text-xl font-semibold text-gray-900">"{text}"</p>
        </div>

        {/* Animation Visualization */}
        <div className="flex items-center justify-center gap-1">
          {words.map((word, i) => (
            <div
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={speakText}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Volume2 className="w-4 h-4" />
            Play Audio
          </button>

          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-500 rounded-full animate-pulse"
                style={{
                  height: `${12 + Math.random() * 12}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Duration Estimate */}
        <p className="text-xs text-gray-500">
          Estimated duration: ~{words.length * 1.5}s
        </p>
      </div>
    </div>
  );
};

export default Signanimation;
