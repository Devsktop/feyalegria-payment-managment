import { FETCH_GRADES } from '../actions/gradesActions';

const initialState = {
  grades: {}
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_GRADES:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
