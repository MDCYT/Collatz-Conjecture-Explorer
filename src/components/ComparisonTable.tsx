import React from 'react';
import { useCollatzStore } from '../store/useCollatzStore';
import type { CollatzResult } from '../types';

export const ComparisonTable: React.FC<{ results: CollatzResult[] }> = ({ results }) => {
  const { language } = useCollatzStore();

  const headers = {
    number: language === 'es' ? 'Número' : 'Number',
    steps: language === 'es' ? 'Pasos' : 'Steps',
    maxValue: language === 'es' ? 'Valor Máximo' : 'Max Value',
    stoppingTime: language === 'es' ? 'Tiempo de Parada' : 'Stopping Time',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {Object.values(headers).map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {result.sequence[0]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {result.steps}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {result.maxValue}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {result.stoppingTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};