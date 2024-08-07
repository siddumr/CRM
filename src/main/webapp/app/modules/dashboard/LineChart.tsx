import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Lead {
  id: number;
  created_at: string;
}

interface LineChartProps {
  data: {
    leads: Lead[];
    contacts: number;
    meetings: number;
  };
  size?: { width: number; height: number };
}

const LineChart: React.FC<LineChartProps> = ({ data, size }) => {
  const leadsByMonth = data.leads.reduce((acc: { [key: string]: number }, lead) => {
    const month = new Date(lead.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const counts = Array.from({ length: Object.keys(leadsByMonth).length }, (_, i) => i + 1);

  const lineData = {
    labels: counts,
    datasets: [
      {
        label: 'Leads',
        data: Object.values(leadsByMonth),
        fill: false,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
      },
      {
        label: 'Contacts',
        data: new Array(counts.length).fill(data.contacts),
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
      {
        label: 'Meetings',
        data: new Array(counts.length).fill(data.meetings),
        fill: false,
        backgroundColor: '#FFCE56',
        borderColor: '#FFCE56',
      },
    ],
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
      <Line data={lineData} options={options} />
    </div>
  );
};

export default LineChart;
