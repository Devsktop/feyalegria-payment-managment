import {
  FETCH_REPRESENTATIVEBYDNI,
  IS_FECTHING,
  IS_FECTHED,
  ADD_REPRESENTATIVE
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

    case ADD_REPRESENTATIVE: {
      const { idRepresentative } = payload.representative;
      const representative = { ...payload.representative, idRepresentative };
      const representatives = {
        ...state.representatives,
        [idRepresentative]: representative
      };
      return {
        ...state,
        representatives
      };
    }

    default:
      return state;
  }
}
