import { useState, useRef, useCallback, useEffect } from 'react';

interface CameraControls {
  isActive: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  captureFrame: () => string | null;
  bindVideo: (node: HTMLVideoElement | null) => void;
  bindCanvas: (node: HTMLCanvasElement | null) => void;
}

export const useCamera = (): CameraControls => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const canvasElement = useRef<HTMLCanvasElement | null>(null);
  const stream = useRef<MediaStream | null>(null);

  const bindVideo = useCallback((node: HTMLVideoElement | null) => {
    videoElement.current = node;
  }, []);

  const bindCanvas = useCallback((node: HTMLCanvasElement | null) => {
    canvasElement.current = node;
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      if (videoElement.current) {
        videoElement.current.srcObject = userStream;
        await videoElement.current.play();
        stream.current = userStream;
        setIsActive(true);
      } else {
        throw new Error('Video element not found');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to access the camera. Please allow camera permissions.');
      setIsActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream.current) {
      stream.current.getTracks().forEach((track) => track.stop());
      stream.current = null;
    }

    if (videoElement.current) {
      videoElement.current.pause();
      videoElement.current.srcObject = null;
    }

    setIsActive(false);
  }, []);

  const captureFrame = useCallback(() => {
    const video = videoElement.current;
    const canvas = canvasElement.current;

    if (!video || !canvas || !isActive) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isActive]);

  // Cleanup camera on component unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return {
    isActive,
    error,
    startCamera,
    stopCamera,
    captureFrame,
    bindVideo,
    bindCanvas,
  };
};
