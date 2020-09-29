import { combineReducers } from 'redux';
import login from './loginReducer';
import upperbar from './upperbarReducer';

export default combineReducers({ login, upperbar });
