import React from 'react';

// Components
import DataBoxContainer from './DataBoxContainer';
import ChartContainer from './ChartContainer';

const Dashboard = () => {
  return (
    <div className="dashboard content-screen">
      <DataBoxContainer />
      <ChartContainer />
    </div>
  );
};

export default Dashboard;
