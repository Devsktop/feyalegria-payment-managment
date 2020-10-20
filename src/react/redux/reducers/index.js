import { combineReducers } from 'redux';
import login from './loginReducer';
import upperbar from './upperbarReducer';
import students from './studentsReducer';
import payments from './paymentsReducer';
import grades from './gradesReducer';
import products from './productsReducer';
import rates from './ratesReducer';

export default combineReducers({
  login,
  upperbar,
  students,
  payments,
  rates,
  grades,
  products
});
