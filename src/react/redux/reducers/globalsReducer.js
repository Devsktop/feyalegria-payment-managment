import { FETCH_GLOBALS } from '../actions/globalsActions';

const initialState = {
  currentMonth: 0,
  months: {
    1: 'Septiembre',
    2: 'Octubre',
    3: 'Noviembre',
    4: 'Diciembre',
    5: 'Enero',
    6: 'Febrero',
    7: 'Marzo',
    8: 'Abril',
    9: 'Mayo',
    10: 'Junio',
    11: 'Julio',
    12: 'Agosto'
  }
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
