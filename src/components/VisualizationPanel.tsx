import React, { useState } from 'react';
import { useCollatzStore } from '../store/useCollatzStore';
import { ZoomableChart } from './ZoomableChart';
import { ExportPanel } from './ExportPanel';
import { ComparisonTable } from './ComparisonTable';

export const VisualizationPanel: React.FC = () => {
  const { sequence, language, multipleNumbers } = useCollatzStore();
  const [showComparison, setShowComparison] = useState(false);
  
  interface DataPoint {
    step: number;
    value: number;
  }

  const data: DataPoint[] = sequence.map((value: number, index: number) => ({
    step: index,
    value: value,
  }));

  const store = useCollatzStore();
  const results = store.calculateMultipleSequences();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {language === 'es' ? 'Visualización de Secuencia' : 'Sequence Visualization'}
        </h2>
        <div className="flex items-center space-x-4">
          {multipleNumbers.length > 0 && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {showComparison 
                ? (language === 'es' ? 'Mostrar Gráfico' : 'Show Graph')
                : (language === 'es' ? 'Mostrar Comparación' : 'Show Comparison')}
            </button>
          )}
          <ExportPanel />
        </div>
      </div>
      
      {showComparison && multipleNumbers.length > 0 ? (
        <ComparisonTable results={results} />
      ) : (
        <ZoomableChart data={data} />
      )}
    </div>
  );
};