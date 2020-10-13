import {
  LOG_OUT,
  IS_LOGIN,
  CORRECT_LOG,
  BAD_LOG,
  RESET_ATTEMPTS,
  DATA_LOADED,
  CREATE_DB
} from '../actions/loginActions';

const initialState = {
  logged: false,
  isLogin: false,
  attempts: 0,
  dataLoaded: false,
  db: false,
  idUser: '',
  username: ''
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: true
      };
    case CORRECT_LOG:
      return {
        ...state,
        isLogin: false,
        idUser: payload.idUser,
        username: payload.username,
        logged: true
      };

    case BAD_LOG:
      return {
        ...state,
        isLogin: false,
        attempts: state.attempts + 1
      };

    case RESET_ATTEMPTS: {
      const attempts = state.attempts === 3 ? 0 : state.attempts;
      return {
        ...state,
        attempts
      };
    }

    case LOG_OUT:
      return {
        ...state,
        logged: false,
        id: '',
        attempts: 0,
        dataLoaded: false,
        username: ''
      };

    case DATA_LOADED:
      return {
        ...state,
        dataLoaded: true
      };

    case CREATE_DB:
      return {
        ...state,
        db: true
      };

    default:
      return state;
  }
}
