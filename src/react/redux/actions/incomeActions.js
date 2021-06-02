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

export const resetIncome = () => {
  return (dispatch, getState) => {
    const { products } = getState().products;
    dispatch(resetIncomeAction());
    dispatch(setProducts(products));
  };
};

export const RESET_INCOME = 'RESET_INCOME';

export const resetIncomeAction = () => ({
  type: RESET_INCOME
});

export const SET_INITIAL_PRODUCTS = 'SET_INITIAL_PRODUCTS';

export const setProducts = products => ({
  type: SET_INITIAL_PRODUCTS,
  payload: { products }
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

export const EDIT_STUDENT = 'EDIT_STUDENT';

export const editStudent = student => ({
  type: EDIT_STUDENT,
  payload: { student }
});

export const TOGGLE_STUDENT = 'TOGGLE_STUDENT';

export const toggleStudent = (idStudent, toggle) => ({
  type: TOGGLE_STUDENT,
  payload: { idStudent, toggle }
});

export const TOGGLE_PAYMETN_METHOD = 'TOGGLE_PAYMETN_METHOD';

export const togglePaymentMethod = method => ({
  type: TOGGLE_PAYMETN_METHOD,
  payload: { method }
});

export const UPDATE_TRANSFERENCE = 'UPDATE_TRANSFERENCE';

export const updateTransference = (amount, ref) => ({
  type: UPDATE_TRANSFERENCE,
  payload: { amount, ref }
});

export const UPDATE_CASH = 'UPDATE_CASH';

export const updateCash = amount => ({
  type: UPDATE_CASH,
  payload: { amount }
});

export const UPDATE_DOLAR = 'UPDATE_DOLAR';

export const updateDolar = amount => ({
  type: UPDATE_DOLAR,
  payload: { amount }
});

export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export const updateBalance = balance => ({
  type: UPDATE_BALANCE,
  payload: { balance }
});

export const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = idProduct => ({
  type: ADD_PRODUCT,
  payload: { idProduct }
});

export const SUBSTRACT_PRODUCT = 'SUBSTRACT_PRODUCT';

export const substractProduct = idProduct => ({
  type: SUBSTRACT_PRODUCT,
  payload: { idProduct }
});

export const FETCH_INCOME = 'FETCH_INCOME';

export const fetchIncome = () => {
  return async (dispatch, getState) => {
    // Revisar representante y alumnos y registrarlos o no
    const { income } = getState();
    try {
      const representative = await handleRepresentative(income.representative);
      console.log(representative);
    } catch (error) {
      console.log(error);
    }
  };
};

const handleRepresentative = async representative => {
  return representative.idRepresentative !== 0
    ? representative
    : createRepresentative(representative);
};

const createRepresentative = async representative => {
  const url = 'http://localhost:3500/api/representative';
  const config = {
    method: 'POST',
    body: JSON.stringify(representative),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, config);

  if (response.status === 400) {
    throw new Error(response.json());
  } else if (response.status === 200) {
    return response.json();
  }
  return null;
};
