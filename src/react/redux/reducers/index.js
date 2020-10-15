import { combineReducers } from 'redux';
import login from './loginReducer';
import upperbar from './upperbarReducer';
import students from './studentsReducer';
import payments from './paymentsReducer';
import rates from './ratesReducer';

export default combineReducers({ login, upperbar, students, payments, rates });
