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
import UserRecover from 'react/components/UserRecover/UserRecover';
import Maintenance from 'react/components/Maintenance/Maintenance';

// Navigations
import Navigation from './Navigation';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/load" component={DataLoad} />
        <Route exact path="/recover" component={UserRecover} />
        <Route exact path="/mantenimiento" component={Maintenance} />
      </Switch>
      <Redirect exact from="/" to="/login" />
    </Router>
  );
};

export default AppRouter;
