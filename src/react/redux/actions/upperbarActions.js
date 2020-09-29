export const SHOW_MENU = 'SHOW_MENU';

export const showMenu = show => ({
  type: SHOW_MENU,
  payload: { show }
});

export const SET_DOLAR = 'SET_DOLAR';

export const setDolar = dolar => ({
  type: SET_DOLAR,
  payload: { dolar }
});
