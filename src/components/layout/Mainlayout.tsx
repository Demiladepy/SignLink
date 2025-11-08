import React, { useState, useEffect } from "react";
import Header from "./Header";
import Modeselector from "../common/Modeselector";
import InputPanel from "../panels/InputPanel";
import TranslationPanel from "../panels/TranslationPanel";
import Uicustomizer from "../customization/Uicustomizer";
import { useTranslation } from "../../contexts/TranslationContext";
import signlanguage from "../../services/signlanguage";

const MainLayout: React.FC = () => {
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [isServiceReady, setIsServiceReady] = useState<boolean>(false);
  const { mode } = useTranslation();

  useEffect(() => {
    const initializeService = async () => {
      try {
        await signlanguage.initialize();
        setIsServiceReady(true);
        console.log("✅ Sign Language Service initialized successfully");
      } catch (error) {
        console.error("❌ Failed to initialize Sign Language Service:", error);
      }
    };
    initializeService();
  }, []);

  const handleCustomizerToggle = (): void => {
    setShowCustomizer((prev) => !prev);
  };

  const handleCustomizerClose = (): void => {
    setShowCustomizer(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCustomize={handleCustomizerToggle} />

      {showCustomizer && <Uicustomizer onClose={handleCustomizerClose} />}

      <main className="container mx-auto px-4 py-6 space-y-6">
        {!isServiceReady && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-yellow-800">
                Initializing sign language service...
              </p>
            </div>
          </div>
        )}

        <Modeselector />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputPanel  mode={mode} />
          <TranslationPanel />
        </div>

        <footer className="mt-8 pb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About Signlink</h3>
                <p className="text-gray-600">
                  AI-powered real-time sign language translation platform bridging
                  communication between deaf and hearing communities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Real-time sign detection</li>
                  <li>• Text-to-sign conversion</li>
                  <li>• Voice input support</li>
                  <li>• AI customization</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Current Mode</h3>
                <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700 font-medium capitalize">
                    {mode.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;
