import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import BackUp from './BackUp';

const Maintenance = () => {
  const { state } = useLocation();

  if (!state) return <Redirect to="/login" />;

  return (
    <div className="container maintenance">
      <div className="maintenance-box">
        <BackUp />
      </div>
    </div>
  );
};

export default Maintenance;
