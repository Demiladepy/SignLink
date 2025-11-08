export const TRANSLATION_MODES = {
  SIGN_TO_TEXT: 'sign-to-text',
  TEXT_TO_SIGN: 'text-to-sign',
  VOICE_TO_SIGN: 'voice-to-sign'
};

export const MESSAGE_TYPES = {
  DETECTED: 'detected',
  USER: 'user',
  SIGN_ANIMATION: 'sign-animation',
  ERROR: 'error',
  SYSTEM: 'system'
};

export const CAMERA_CONSTRAINTS = {
  video: {
    facingMode: 'user',
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
};

export const MOCK_SIGNS = [
  'Hello',
  'Thank you',
  'Please',
  'Yes',
  'No',
  'Help',
  'Sorry',
  'Good morning',
  'Good night',
  'How are you',
  'I love you',
  'See you later'
];