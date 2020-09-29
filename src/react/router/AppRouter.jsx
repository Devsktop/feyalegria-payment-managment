import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// SCREENS
import Login from 'react/components/Login/Login';
import DataLoad from 'react/components/Login/DataLoad';
import DashBoard from 'react/components/dashboard/DashBoard';
import UserRecover from 'react/components/UserRecover/UserRecover';
import Maintenance from 'react/components/Maintenance/Maintenance';

// Navigations
import UpperBar from './Upperbar';
import Menu from './Menu';

const AppRouter = () => {
  return (
    <Router>
      <UpperBar />
      <div className="main_panel">
        <Menu />
        <div className="content">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/load" component={DataLoad} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/recover" component={UserRecover} />
            <Route exact path="/mantenimiento" component={Maintenance} />
          </Switch>
        </div>
      </div>
      <Redirect exact from="/" to="/login" />
    </Router>
  );
};

export default AppRouter;
