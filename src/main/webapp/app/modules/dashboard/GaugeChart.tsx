import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

interface GaugeChartProps {
  gaugeValue: number;
  maxValue: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ gaugeValue, maxValue }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
      <Gauge
        value={gaugeValue}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: 'translate(0px, 0px)',
          },
          width: '100%',
          height: '100%',
        }}
        text={({ value }) => `${value} / ${maxValue}`}
      />
    </div>
  );
};

export default GaugeChart;
