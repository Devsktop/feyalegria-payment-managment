import React from 'react';
import { useSelector } from 'react-redux';

// Components
import MenuHandler from './MenuHandler';
import DolarPortalHandler from './DolarPortalHandler';
import Logout from './Logout';



const UpperBar = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  if (!dataLoaded) return null;

  return (
    <div className="upper_bar">
      </MenuHandler />
      <DolarPortalHandler />
      <Logout />
    </div>
  );
};

export default UpperBar;
