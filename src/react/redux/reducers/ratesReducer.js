import { FETCH_RATES } from '../actions/ratesActions';

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_RATES:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
