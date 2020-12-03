import { fetchStudents } from 'react/redux/actions/studentsActions';
import { fetchPayments } from 'react/redux/actions/paymentsActions';
import { fetchRates } from 'react/redux/actions/ratesActions';
import { fetchConcepts } from 'react/redux/actions/conceptsActions';
import { fetchGlobals } from 'react/redux/actions/globalsActions';

export const IS_LOGIN = 'IS_LOGIN';

const isLogin = () => ({
  type: IS_LOGIN
});

export const CORRECT_LOG = 'CORRECT_LOG';

const correctLog = (idUser, username) => ({
  type: CORRECT_LOG,
  payload: { idUser, username }
});

export const BAD_LOG = 'BAD_LOG';

const badLog = () => ({
  type: BAD_LOG
});

export function login({ user, pass }) {
  return dispatch => {
    dispatch(isLogin());
    // HACER FETCH A LA BDD
    const config = {
      method: 'POST',
      body: JSON.stringify({ user, password: pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch('http://localhost:3500/api/login', config)
      .then(res => res.json())
      .then(({ idUser, username }) => {
        if (!idUser) dispatch(badLog());
        else {
          dispatch(correctLog(idUser, username));
        }
      });
  };
}

export const RESET_ATTEMPTS = 'RESET_ATTEMPTS';

export const resetAttempts = () => ({
  type: RESET_ATTEMPTS
});

export const DATA_LOADED = 'DATA_LOADED';

const dataLoadedAction = () => ({
  type: DATA_LOADED
});

// Call initial app data and dispatch it an then set dataLoaded true
export function fetchData() {
  return dispatch => {
    // HACER FETCH A LA BDD
    return new Promise(resolve => setTimeout(resolve, 0)).then(async () => {
      // Getting dahsboard initial data
      const students = await fetchStudents();
      await dispatch(students);

      const payments = await fetchPayments();
      await dispatch(payments);

      const rates = await fetchRates();
      await dispatch(rates);
      dispatch(fetchConcepts(rates.payload));

      const globals = await fetchGlobals();
      await dispatch(globals);

      // Data loaded set to true
      await dispatch(dataLoadedAction());
    });
  };
}

export const LOG_OUT = 'LOG_OUT';

export function logOut() {
  return dispatch => {
    dispatch({ type: 'CLOSE_MENU' });
    dispatch({ type: 'LOG_OUT' });
  };
}

export const CREATE_DB = 'CREATE_DB';

export const createDb = () => ({
  type: CREATE_DB
});
