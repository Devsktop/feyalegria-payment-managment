import { fetchSaleRecords } from 'react/redux/actions/saleRecordsActions';

export const IS_LOGIN = 'IS_LOGIN';

const isLogin = () => ({
  type: IS_LOGIN
});

export const CORRECT_LOG = 'CORRECT_LOG';

const correctLog = id => ({
  type: CORRECT_LOG,
  payload: { id }
});

export const BAD_LOG = 'BAD_LOG';

const badLog = () => ({
  type: BAD_LOG
});

export function login({ user, pass }) {
  return dispatch => {
    // Simulte login, replace later
    dispatch(isLogin());
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('simulating login call, remember to delete this later');

      if (user === 'admin' && pass === '123') {
        dispatch(correctLog(0));
      } else dispatch(badLog());
    }, 2000);
  };

  // return dispatch => {
  //   dispatch(isLogin());
  //   // HACER FETCH A LA BDD
  //   const config = {
  //     method: 'POST',
  //     body: JSON.stringify({ userN: user, pass }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };

  //   return fetch('http://localhost:3500/api/tasks/Login', config)
  //     .then(res => res.json())
  //     .then(({ userdata }) => {
  //       if (userdata.resp) dispatch(badLog());
  //       else if (userdata.Admin) {
  //         dispatch(correctLog(userdata.Id_Usuario));
  //       }
  //     });
  // };
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
      await dispatch(fetchSaleRecords(new Date(), new Date()));

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
