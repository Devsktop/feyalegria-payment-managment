import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

// Components
import DataBox from './DataBox';
import ChartContainer from './ChartContainer';

const Dashboard = () => {
  return (
    <div className="dashboard content-screen">
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <ChartContainer />
    </div>
  );
};

export default Dashboard;
