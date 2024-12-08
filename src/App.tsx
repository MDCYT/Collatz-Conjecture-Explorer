import React from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import { StatsPanel } from './components/StatsPanel';
import { useCollatzStore } from './store/useCollatzStore';

const App: React.FC = () => {
  const { isDarkMode } = useCollatzStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InputPanel />
              <StatsPanel />
            </div>
            <VisualizationPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;