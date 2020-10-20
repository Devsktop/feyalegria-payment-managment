import { combineReducers } from 'redux';
import login from './loginReducer';
import upperbar from './upperbarReducer';
import students from './studentsReducer';
import payments from './paymentsReducer';
import grades from './gradesReducer';
<<<<<<< HEAD
import products from './productsReducer';
import rates from './ratesReducer';

=======

import rates from './ratesReducer';

>>>>>>> 98a7d80b5879c406b0cd48993fec467b82c395ce
export default combineReducers({
  login,
  upperbar,
  students,
  payments,
  rates,
<<<<<<< HEAD
  grades,
  products
=======
  grades
>>>>>>> 98a7d80b5879c406b0cd48993fec467b82c395ce
});
