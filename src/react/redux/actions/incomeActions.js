export const SET_INCOME = 'SET_INCOME';

export const setIncome = income => ({
  type: SET_INCOME,
  payload: { income }
});

export const UPDATE_REPRESENTATIVE = 'UPDATE_REPRESENTATIVE';

export const updateRepresentative = representative => ({
  type: UPDATE_REPRESENTATIVE,
  payload: { representative }
});

export const RESET_INCOME = 'RESET_INCOME';

export const resetIncome = () => ({
  type: RESET_INCOME
});
