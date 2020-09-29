import { SHOW_MENU, SET_DOLAR } from '../actions/upperbarActions';

const initialState = {
  showMenu: false,
  dolar: 0
};
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SHOW_MENU:
      return {
        ...state,
        showMenu: payload.show
      };

    case SET_DOLAR:
      return {
        ...state,
        dolar: payload.dolar
      };

    default:
      return state;
  }
}
