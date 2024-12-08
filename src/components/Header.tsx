import React from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { useCollatzStore } from '../store/useCollatzStore';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, language, setLanguage } = useCollatzStore();

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Collatz Conjecture Explorer
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label='Change language'
          >
            <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label='Toggle dark mode'
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};