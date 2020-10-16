import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// SCREENS
import Login from 'react/components/Login/Login';
import DataLoad from 'react/components/Login/DataLoad';
import DashBoard from 'react/components/dashboard/DashBoard';
import Income from 'react/components/income/Income';
import Register from 'react/components/register/Register';
import Representatives from 'react/components/representatives/Representatives';
import Students from 'react/components/students/Students';
import Config from 'react/components/config/Config';
import UserRecover from 'react/components/UserRecover/UserRecover';
import Maintenance from 'react/components/Maintenance/Maintenance';

// Config Screens
import Grades from 'react/components/grades/Grades';

// Navigations
import UpperBar from './Upperbar';
import Menu from './Menu';

const AppRouter = () => {
  // if user is not logged will show login screen
  // this screen must take all width of screen because does not
  // have menu, so this var is used to conditionally set a css
  // class ton content div.
  const logged = useSelector(state => state.login.logged);

  return (
    <Router>
      <UpperBar />
      <div className="main_panel">
        <Menu />
        <div
          className={`content ${!logged ? 'full_screen' : 'content_center'}`}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/load" component={DataLoad} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/income" component={Income} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/representatives" component={Representatives} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/config" component={Config} />
            <Route exact path="/recover" component={UserRecover} />
            <Route exact path="/mantenimiento" component={Maintenance} />

            {/* // Config Screens */}
            <Route exact path="/grades" component={Grades} />
          </Switch>
        </div>
      </div>
      <Redirect exact from="/" to="/login" />
    </Router>
  );
};

export default AppRouter;
