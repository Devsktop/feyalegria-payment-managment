import {
  FETCH_REPRESENTATIVEBYDNI,
  IS_FECTHING_REPRESENTATIVES,
  IS_FECTHED_REPRESENTATIVES,
  ADD_REPRESENTATIVE,
  FETCH_REPRESENTATIVES
} from '../actions/representativesActions';

const initialState = {
  representatives: {},
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

    case IS_FECTHING_REPRESENTATIVES:
      return {
        ...state,
        isFetching: payload
      };

    case IS_FECTHED_REPRESENTATIVES:
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

    case FETCH_REPRESENTATIVES:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
}
