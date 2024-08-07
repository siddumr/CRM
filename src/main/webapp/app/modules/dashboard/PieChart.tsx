import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    totalLeads: number;
    totalContacts: number;
    totalMeetings: number;
  };
  size?: { width: number; height: number };
}

const PieChart: React.FC<PieChartProps> = ({ data, size }) => {
  const pieData = {
    labels: ['Total Leads', 'Total Contacts', 'Total Meetings'],
    datasets: [
      {
        data: [data.totalLeads, data.totalContacts, data.totalMeetings],
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
