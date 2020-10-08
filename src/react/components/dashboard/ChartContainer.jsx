import React from 'react';

// Components
import CircleChart from './CircleChart';

const ChartContainer = () => {
  return (
    <div className="chart_container">
      <CircleChart
        desc="Alumnos solventes"
        percent="75"
        text={`${75}%`}
        total="450/561"
      />
      <CircleChart
        desc="Pagos del mes"
        percent="75"
        text={`${75}%`}
        total="900/1122"
      />
      <CircleChart
        desc="Alumnos solventes"
        percent="45"
        text={`${45}%`}
        total="25/60"
      />
    </div>
  );
};

export default ChartContainer;
