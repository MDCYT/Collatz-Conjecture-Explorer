import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Brush,
} from 'recharts';
import { useCollatzStore } from '../store/useCollatzStore';

interface ZoomableChartProps {
  data: Array<{ step: number; value: number }>;
}

const COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
];

export const ZoomableChart: React.FC<ZoomableChartProps> = () => {
  const { multipleNumbers } = useCollatzStore();

  const store = useCollatzStore();
  const results = store.calculateMultipleSequences();

  // Transform data for multiple sequences
  interface DataPoint {
    step: number;
    [key: string]: number;
  }

  interface Result {
    sequence: number[];
  }

  const data: DataPoint[] = results.reduce(
    (acc: DataPoint[], result: Result, index: number): DataPoint[] => {
      result.sequence.forEach((value: number, step: number): void => {
        if (!acc[step]) {
          acc[step] = { step };
        }
        acc[step][`value${index}`] = value;
      });
      return acc;
    },
    []
  );

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="step"
          />
          <YAxis
            allowDataOverflow
            type="number"
          />
          <Tooltip />
          <Legend />
          <Brush dataKey="step" height={30} stroke="#8884d8" />
          {results.map((_result: Result, index: number) => (
            <Line
              key={index}
              type="monotone"
              dataKey={`value${index}`}
              name={`Number ${multipleNumbers[index]}`}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
              animationDuration={500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};