import React from 'react';
import { useCollatzStore } from '../store/useCollatzStore';

export const StatsPanel: React.FC = () => {
  const { calculateMultipleSequences } = useCollatzStore();

  const results = calculateMultipleSequences();

  const {sequence, maxValue, stoppingTime} = results[0] || { sequence: [], maxValue: 0, stoppingTime: 0 };

  const multipleNumbers = results.length > 1;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Sequence Statistics {multipleNumbers && `(${results.length} Sequences)`}
      </h2>
      {!multipleNumbers ? (
        <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Steps</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {sequence.length}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Max Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {maxValue}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Stopping Time</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stoppingTime}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Final Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {sequence[sequence.length - 1] || 0}
          </p>
        </div>
      </div>) : (
        <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Steps (Total)</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {results.reduce((acc, result) => acc + result.sequence.length, 0)}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Max Value (Max)</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.max(...results.map(result => result.maxValue))}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Stopping Time (Max)</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.max(...results.map(result => result.stoppingTime))}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Final Value (Last)</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {results[results.length - 1].sequence[results[results.length - 1].sequence.length - 1]}
          </p>
        </div>
      </div>
      )}
    </div>
  );
};