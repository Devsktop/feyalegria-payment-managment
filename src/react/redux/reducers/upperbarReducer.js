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
        showMenu: !state.showMenu
      };

    case SET_DOLAR:
      return {
        ...state,
        dolar: payload.dolar
      };

    case 'CLOSE_MENU':
      return {
        ...state,
        showMenu: false
      };

    default:
      return state;
  }
}
