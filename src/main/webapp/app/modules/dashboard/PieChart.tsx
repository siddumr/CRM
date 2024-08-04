import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    totalLeads: number;
    newLeadsCount: number;
    closedLeadsCount: number;
  };
  size?: { width: number; height: number };
}

const PieChart: React.FC<PieChartProps> = ({ data, size }) => {
  const pieData = {
    labels: ['New Leads', 'Closed Leads', 'Other Leads'],
    datasets: [
      {
        data: [data.newLeadsCount, data.closedLeadsCount, data.totalLeads - data.newLeadsCount - data.closedLeadsCount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: size?.width, height: size?.height }}>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default PieChart;
