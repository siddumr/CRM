// LineZoneChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineZoneChartProps {
  data: { labels: string[]; values: number[] };
}

const LineZoneChart: React.FC<LineZoneChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Contacts Over Time',
        data: data.values,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineZoneChart;
