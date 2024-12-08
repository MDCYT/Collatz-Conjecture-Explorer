import React, { useEffect } from 'react';
import { useCollatzStore } from '../store/useCollatzStore';

export const InputPanel: React.FC = () => {
  const { 
    maxIterations,
    setMaxIterations,
    setMultipleNumbers,
    calculateSequence,
    language,
    error
  } = useCollatzStore();

  const handleSubmit = (e: React.FormEvent) => {
    calculateSequence();
    e.preventDefault();
  };

  const handleNumberInput = (value: string) => {
    setMultipleNumbers(value);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get('start');
    const iterations = urlParams.get('iterations');

    if (start) {
      setMultipleNumbers(start);
      // set id="numbers" value to start
      const numbersInput = document.getElementById('numbers') as HTMLInputElement;
      if (numbersInput) numbersInput.value = start;

    }

    if (iterations) {
      setMaxIterations(Number(iterations));
    }
  }, [setMultipleNumbers, setMaxIterations]); // Asegúrate de incluir las dependencias correctas

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="numbers"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {language === 'es' ? 'Número(s)' : 'Number(s)'}
          </label>
          <input
            type="text"
            id="numbers"
            onChange={(e) => handleNumberInput(e.target.value)}
            placeholder={language === 'es' ? 'Ej: 27 o 27, 97, 871' : 'Ex: 27 or 27, 97, 871'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {language === 'es' 
              ? 'Ingrese un número o varios números separados por comas' 
              : 'Enter a single number or multiple numbers separated by commas'}
          </p>
        </div>

        <div>
          <label 
            htmlFor="maxIterations"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {language === 'es' ? 'Iteraciones Máximas' : 'Maximum Iterations'}
          </label>
          <input
            type="number"
            id="maxIterations"
            min="1"
            value={maxIterations}
            onChange={(e) => setMaxIterations(parseInt(e.target.value) || 1000)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {language === 'es' 
              ? 'Límite de iteraciones para prevenir bucles infinitos' 
              : 'Iteration limit to prevent infinite loops'}
          </p>
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {language === 'es' ? 'Calcular' : 'Calculate'}
        </button>
      </form>
    </div>
  );
};