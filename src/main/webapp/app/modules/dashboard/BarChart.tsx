// BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: { labels: string[]; values: number[] };
  size: { width: number; height: number };
}

const BarChart: React.FC<BarChartProps> = ({ data, size }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Leads',
        data: data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} width={size.width} height={size.height} options={{ responsive: true }} />;
};

export default BarChart;
