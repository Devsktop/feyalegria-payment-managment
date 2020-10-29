import { FETCH_RATES, UPDATE_RATES } from '../actions/ratesActions';

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_RATES:
      return {
        ...state,
        ...payload
      };

    case UPDATE_RATES: {
      const { rate } = payload;
      const rates = { ...state, [rate.idRate]: { ...rate } };

      return {
        ...state,
        ...rates
      };
    }
    default:
      return state;
  }
}
