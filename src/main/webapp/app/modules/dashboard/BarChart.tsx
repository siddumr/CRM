import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      values: number[];
      backgroundColor: string;
    }[];
  };
  size?: { width: number; height: number };
}

const BarChart: React.FC<BarChartProps> = ({ data, size }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      label: dataset.label,
      data: dataset.values,
      backgroundColor: dataset.backgroundColor,
    })),
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: size?.width, height: size?.height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
