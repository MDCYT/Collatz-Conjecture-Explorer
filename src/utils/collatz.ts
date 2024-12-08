export const calculateCollatzSequence = (
  start: number,
  maxIterations: number
): { sequence: number[]; maxValue: number; stoppingTime: number } => {
  const sequence: number[] = [start];
  let current = start;
  let maxValue = start;
  let stoppingTime = 0;

  while (current !== 1 && sequence.length < maxIterations) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    sequence.push(current);
    maxValue = Math.max(maxValue, current);
    if (current <= start && stoppingTime === 0) {
      stoppingTime = sequence.length;
    }
  }

  return { sequence, maxValue, stoppingTime: stoppingTime || sequence.length };
};