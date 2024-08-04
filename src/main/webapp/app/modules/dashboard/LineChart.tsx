import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Lead {
  id: number;
  created_at: string;
}

interface LineChartProps {
  data: Lead[];
  size?: { width: number; height: number };
}

const LineChart: React.FC<LineChartProps> = ({ data, size }) => {
  const lineData = {
    labels: data.map(lead => new Date(lead.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Leads Over Time',
        data: data.map(lead => lead.id),
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: size?.width, height: size?.height }}>
      <Line data={lineData} options={options} />
    </div>
  );
};

export default LineChart;
