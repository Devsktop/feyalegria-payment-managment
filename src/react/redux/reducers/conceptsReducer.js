import { FETCH_CONCEPTS } from '../actions/conceptsActions';

// Concepts is internally equal to rates reducer, buty this is used to manipuale
// and edit concepts before saving
const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CONCEPTS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
