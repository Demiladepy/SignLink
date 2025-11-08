import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface HeaderProps {
  onCustomize: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCustomize }) => (
  <header className="bg-white border-b border-gray-200">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Signlink</h1>
            <p className="text-sm text-gray-500">Real-time sign language translation</p>
          </div>
        </div>

        <button
          onClick={onCustomize}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Customize</span>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
