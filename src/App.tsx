import React from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import MainLayout from './components/layout/Mainlayout';

const App: React.FC = () => {
  return (
    <TranslationProvider>
      <MainLayout />
    </TranslationProvider>
  );
};

export default App;