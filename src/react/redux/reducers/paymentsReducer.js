import { FETCH_PAYMENTS } from '../actions/paymentsActions';

const initialState = {
  today: {},
  month: {},
  advancements: {},
  arrears: {}
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PAYMENTS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
