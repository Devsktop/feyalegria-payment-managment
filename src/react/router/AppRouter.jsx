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

// Income Screens
import VerifyRepresentative from 'react/components/income/VerifyRepresentative';
import AddRepresentative from 'react/components/income/AddRepresentative';
import AddStudent from 'react/components/income/AddStudent';
import JoinStudents from 'react/components/income/JoinStudentsBox';
import IncomePaymenet from 'react/components/income/IncomePaymentBox';
import PurchaseProducts from 'react/components/income/PurchaseProductsBox';
import PaymentStatus from 'react/components/income/PaymentStatus';
import PaymentResume from 'react/components/income/PaymentResume';


// Representatives Screens
import RepresentativeByGrade from 'react/components/representatives/RepresentativeByGrade';
import RepresentativeProfile from 'react/components/representatives/RepresentativeProfile';
import EditRepresentative from 'react/components/representatives/EditRepresentative';

// Students Screens
import StudentsByGrade from 'react/components/students/StudentsByGrade';
import StudentProfile from 'react/components/students/StudentProfile';
import EditStudent from 'react/components/students/EditStudent';

// Config Screens
import Grades from 'react/components/grades/Grades';
import AddGrade from 'react/components/grades/AddGrade';
import EditGrade from 'react/components/grades/EditGrade';
import Join from 'react/components/join/Join';
import Products from 'react/components/products/Products';
import AddProduct from 'react/components/products/AddProduct';
import EditProduct from 'react/components/products/EditProduct';
import Monthly from 'react/components/monthly/Monthly';

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

            {/* Income Screens */}
            <Route
              exact
              path="/verifyRepresentative"
              component={VerifyRepresentative}
            />
            <Route
              exact
              path="/addRepresentative"
              component={AddRepresentative}
            />
            <Route exact path="/addStudent" component={AddStudent} />
            <Route exact path="/JoinStudents" component={JoinStudents} />
            <Route exact path="/incomePayment" component={IncomePaymenet} />
            <Route exact path="/purchaseProducts" component={PurchaseProducts} />
            <Route exact path="/paymentStatus" component={PaymentStatus} />
            <Route exact path="/paymentResume" component={PaymentResume} />

            {/* Representatives Screens */}
            <Route
              exact
              path="/representativeByGrade/:id"
              component={RepresentativeByGrade}
            />
            <Route
              exact
              path="/representativeProfile/:idRepresentative"
              component={RepresentativeProfile}
            />
            <Route
              exact
              path="/editRepresentative/:id"
              component={EditRepresentative}
            />

            {/* Students Screens */}
            <Route
              exact
              path="/studentsByGrade/:id"
              component={StudentsByGrade}
            />
            <Route
              exact
              path="/studentProfile/:id"
              component={StudentProfile}
            />
            <Route exact path="/editStudent/:id" component={EditStudent} />

            {/* Config Screens */}
            <Route exact path="/grades" component={Grades} />
            <Route exact path="/addGrade" component={AddGrade} />
            <Route exact path="/editGrade/:id" component={EditGrade} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/addProduct" component={AddProduct} />
            <Route exact path="/editProduct/:id" component={EditProduct} />
            <Route exact path="/monthly" component={Monthly} />
          </Switch>
        </div>
      </div>
      <Redirect exact from="/" to="/login" />
    </Router>
  );
};

export default AppRouter;
