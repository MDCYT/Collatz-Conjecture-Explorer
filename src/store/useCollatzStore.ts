import { create } from 'zustand';
import { CollatzState, CollatzResult } from '../types';
import { calculateCollatzSequence } from '../utils/collatz';

interface CollatzStore extends CollatzState {
  setStartingNumber: (num: number) => void;
  setMultipleNumbers: (numbers: string) => void;
  calculateSequence: () => void;
  calculateMultipleSequences: () => CollatzResult[];
  setMaxIterations: (iterations: number) => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: 'en' | 'es') => void;
  toggleAnimation: () => void;
  setError: (error: string | null) => void;
}

export const useCollatzStore = create<CollatzStore>((set, get) => ({
  startingNumber: 1,
  multipleNumbers: [],
  sequence: [],
  maxIterations: 1000,
  maxValue: 0,
  stoppingTime: 0,
  isDarkMode: false,
  language: 'en',
  showAnimation: true,
  error: null,

  setStartingNumber: (num) => set({ startingNumber: num, error: null }),

  setMultipleNumbers: (numbersStr) => {
    const numbers = numbersStr.split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0);
    set({ multipleNumbers: numbers, error: null });
  },

  calculateSequence: () => set((state) => {
    try {
      const { sequence, maxValue, stoppingTime } = calculateCollatzSequence(
        state.startingNumber,
        state.maxIterations
      );
      return { sequence, maxValue, stoppingTime, error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  }),

  calculateMultipleSequences: () => {
    const state = get();
    return state.multipleNumbers.map(num => {
      const result = calculateCollatzSequence(num, state.maxIterations);
      return {
        ...result,
        steps: result.sequence.length
      };
    });
  },

  setMaxIterations: (iterations) => set({ maxIterations: iterations }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLanguage: (lang) => set({ language: lang }),
  toggleAnimation: () => set((state) => ({ showAnimation: !state.showAnimation })),
  setError: (error) => set({ error }),
}));