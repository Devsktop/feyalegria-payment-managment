import { combineReducers } from 'redux';
import login from './loginReducer';
import upperbar from './upperbarReducer';
import students from './studentsReducer';
import payments from './paymentsReducer';

export default combineReducers({ login, upperbar, students, payments });
