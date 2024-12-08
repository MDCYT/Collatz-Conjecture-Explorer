import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const exportToJSON = (data: number[]) => {
  const jsonData = JSON.stringify(data.map((value, index) => ({ step: index, value })), null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  saveAs(blob, 'collatz-sequence.json');
};

export const exportToCSV = (data: number[]) => {
  const csvData = data.map((value, index) => ({ step: index, value }));
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'collatz-sequence.csv');
};

export const generateShareableLink = (multipleNumbers: number[], maxIterations: number): string => {
  const params = new URLSearchParams({
    start: multipleNumbers.join(','),
    iterations: maxIterations.toString(),
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};