export const SHOW_MENU = 'SHOW_MENU';

export const showMenu = () => ({
  type: SHOW_MENU
});

export const SET_DOLAR = 'SET_DOLAR';

export const setDolar = dolar => ({
  type: SET_DOLAR,
  payload: { dolar }
});
