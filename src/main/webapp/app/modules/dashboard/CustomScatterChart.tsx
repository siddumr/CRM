import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScatterChartProps {
  data: { x: number; y: number }[];
}

const CustomScatterChart: React.FC<ScatterChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Time"
          domain={['dataMin', 'dataMax']}
          tickFormatter={tick => new Date(tick).toLocaleDateString()}
        />
        <YAxis type="number" dataKey="y" name="Lead ID" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Leads" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CustomScatterChart;
