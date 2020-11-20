import { FETCH_GLOBALS } from '../actions/globalsActions';

const initialState = {
  actualMonth: 0
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_GLOBALS:
      return {
        ...state,
        ...payload.globals
      };

    default:
      return state;
  }
}
