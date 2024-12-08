export interface CollatzState {
  startingNumber: number;
  multipleNumbers: number[];
  sequence: number[];
  maxIterations: number;
  maxValue: number;
  stoppingTime: number;
  isDarkMode: boolean;
  language: 'en' | 'es';
  showAnimation: boolean;
  error: string | null;
}

export interface CollatzResult {
  sequence: number[];
  maxValue: number;
  stoppingTime: number;
  steps: number;
}

export interface CollatzStats {
  totalSteps: number;
  maxValue: number;
  stoppingTime: number;
  trajectory: 'increasing' | 'decreasing' | 'mixed';
}