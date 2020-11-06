import { combineReducers } from 'redux';
import login from './loginReducer';
import upperbar from './upperbarReducer';
import representatives from './representativesReducer';
import students from './studentsReducer';
import payments from './paymentsReducer';
import grades from './gradesReducer';
import concepts from './conceptsReducer';
import products from './productsReducer';
import rates from './ratesReducer';
import mirrorGrade from './mirrorGradeReducer';

export default combineReducers({
  login,
  upperbar,
  representatives,
  students,
  payments,
  rates,
  grades,
  concepts,
  products,
  mirrorGrade
});
