export const SET_INCOME = 'SET_INCOME';

export const setIncome = income => ({
  type: SET_INCOME,
  payload: { income }
});

export const UPDATE_REPRESENTATIVE = 'UPDATE_REPRESENTATIVE';

export const updateRepresentative = (representative, exist) => ({
  type: UPDATE_REPRESENTATIVE,
  payload: { representative, exist }
});

export const RESET_INCOME = 'RESET_INCOME';

export const resetIncome = () => ({
  type: RESET_INCOME
});

export const RESET_REPRESENTATIVE = 'RESET_REPRESENTATIVE';

export const resetRepresentative = () => ({
  type: RESET_REPRESENTATIVE
});

export const ADD_STUDENT = 'ADD_STUDENT';

export const addStudent = student => ({
  type: ADD_STUDENT,
  payload: { student }
});
