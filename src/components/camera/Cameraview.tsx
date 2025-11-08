import React, { useEffect } from 'react';
import { Camera, AlertCircle, Loader } from 'lucide-react';
import { useCamera } from '../../hooks/useCamera';
import { useTranslation } from '../../contexts/TranslationContext';
import { signLanguageService } from '../../services/signLanguageService';

// Define expected structure of the detection result
interface SignDetectionResult {
  sign: string;
  confidence: number;
}

// Main component
const Cameraview: React.FC = () => {
  const {
    videoRef,
    canvasRef,
    isActive,
    error,
    startCamera,
    stopCamera,
    captureFrame,
  } = useCamera();

  const { addMessage, isProcessing, setIsProcessing } = useTranslation();

  useEffect(() => {
    signLanguageService.initialize();
  }, []);

  const handleDetectSign = async (): Promise<void> => {
    const frame = captureFrame();
    if (!frame) return;

    setIsProcessing(true);
    try {
      const result: SignDetectionResult = await signLanguageService.detectSign(frame);
      addMessage('detected', result.sign, {
        confidence: result.confidence,
        source: 'camera',
      });
    } catch (err) {
      console.error('Detection error:', err);
      addMessage('error', 'Failed to detect sign. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
        <video
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef as React.RefObject<HTMLCanvasElement>} className="hidden" />

        {/* Camera inactive overlay */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center px-6">
              <div className="inline-flex p-4 bg-gray-800 rounded-2xl mb-4">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-300 text-lg font-medium mb-2">Camera Inactive</p>
              <p className="text-gray-400 text-sm">Click "Start Camera" below to begin</p>
            </div>
          </div>
        )}

        {/* Detection overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <Loader className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="text-gray-900 font-medium">Detecting sign...</span>
            </div>
          </div>
        )}

        {/* Live indicator */}
        {isActive && !isProcessing && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Live</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Camera Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={isActive ? stopCamera : startCamera}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Camera className="w-5 h-5" />
            {isActive ? 'Stop Camera' : 'Start Camera'}
          </div>
        </button>

        {isActive && (
          <button
            onClick={handleDetectSign}
            disabled={isProcessing}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Detect
          </button>
        )}
      </div>
    </div>
  );
};

export default Cameraview;
