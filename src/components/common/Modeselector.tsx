import React from 'react';
import { Camera, MessageSquare, Mic } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

// Define the available mode IDs
type ModeID = 'sign-to-text' | 'text-to-sign' | 'voice-to-sign';

// Define structure for each mode option
interface ModeOption {
  id: ModeID;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  desc: string;
}

const ModeSelector: React.FC = () => {
  const { mode, setMode } = useTranslation();

  const modes: ModeOption[] = [
    { id: 'sign-to-text', label: 'Sign to Text', icon: Camera, desc: 'Translate sign language to text' },
    { id: 'text-to-sign', label: 'Text to Sign', icon: MessageSquare, desc: 'Convert text to sign language' },
    { id: 'voice-to-sign', label: 'Voice to Sign', icon: Mic, desc: 'Speak and see it signed' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {modes.map(({ id, label, icon: Icon, desc }) => (
        <button
          key={id}
          onClick={() => setMode(id)}
          className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
            mode === id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl ${
                mode === id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3
                className={`font-semibold mb-1 ${
                  mode === id ? 'text-blue-900' : 'text-gray-900'
                }`}
              >
                {label}
              </h3>
              <p
                className={`text-sm ${
                  mode === id ? 'text-blue-700' : 'text-gray-500'
                }`}
              >
                {desc}
              </p>
            </div>
          </div>
          {mode === id && (
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
