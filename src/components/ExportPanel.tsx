import React from 'react';
import { Share2, FileJson, FileSpreadsheet } from 'lucide-react';
import { useCollatzStore } from '../store/useCollatzStore';
import { exportToJSON, exportToCSV, generateShareableLink } from '../utils/export';

export const ExportPanel: React.FC = () => {
  const { multipleNumbers, maxIterations, language, calculateMultipleSequences } = useCollatzStore();

  const result = calculateMultipleSequences();

  const handleShare = async () => {
    console.log(multipleNumbers);
    const shareableLink = generateShareableLink(multipleNumbers, maxIterations);
    try {
      // await navigator.clipboard.writeText(shareableLink);
      // alert(language === 'es' ? 'Enlace copiado!' : 'Link copied!');

      // Try navigator.share if available, if not, fallback to copying the link
      if (navigator.share) {
        await navigator.share({
          title: language === 'es' ? 'Secuencia de Collatz' : 'Collatz Sequence',
          text: language === 'es' ? 'Secuencia de Collatz' : 'Collatz Sequence',
          url: shareableLink,
        });
      } else {
        await navigator.clipboard.writeText(shareableLink);
        alert(language === 'es' ? 'Enlace copiado!' : 'Link copied!');
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleShare}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      >
        <Share2 className="w-4 h-4 mr-2" />
        {language === 'es' ? 'Compartir' : 'Share'}
      </button>
      <button
        onClick={() => {
          for (const { sequence } of result) {
            exportToJSON(sequence);
          }
        }}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      >
        <FileJson className="w-4 h-4 mr-2" />
        JSON
      </button>
      <button
        onClick={() => {
          for (const { sequence } of result) {
            exportToCSV(sequence);
          }
        }}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      >
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        CSV
      </button>
    </div>
  );
};