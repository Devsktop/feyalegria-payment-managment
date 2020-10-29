import {
  FETCH_REPRESENTATIVEBYDNI,
  IS_FECTHING,
  IS_FECTHED
} from '../actions/representativesActions';

const initialState = {
  representative: {},
  isFetched: false,
  isFetching: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_REPRESENTATIVEBYDNI:
      return {
        ...state,
        ...payload
      };

    case IS_FECTHING:
      return {
        ...state,
        isFetching: payload
      };

    case IS_FECTHED:
      return {
        ...state,
        isFetched: true
      };

    default:
      return state;
  }
}
