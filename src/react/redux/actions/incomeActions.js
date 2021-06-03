/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Swal from 'sweetalert2';

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

export const addStudentAction = student => ({
  type: ADD_STUDENT,
  payload: { student }
});

export const addStudent = (student, history) => {
  return async (dispatch, getState) => {
    Swal.fire({
      title: 'Verificando cedula',
      showCancelButton: false,
      showConfirmButton: false,
      onOpen: () => addStudentFunction(student, history, dispatch, getState),
      allowOutsideClick: () => !Swal.isLoading()
    });
  };
};

const addStudentFunction = async (student, history, dispatch, getState) => {
  Swal.showLoading();
  try {
    const resStudent = await getStudentByDni(student.dni);
    if (isDniDuplicated(resStudent, student.dni, getState())) {
      duplicatedAlert();
    } else {
      Swal.close();
      dispatch(addStudentAction(student));
      history.push('/JoinStudents');
    }
  } catch (error) {
    Swal.hideLoading();
    Swal.fire({ text: `Request failed: ${JSON.stringify(error)}` });
  }
};

const getStudentByDni = async dni => {
  const url = 'http://localhost:3500/api/studentbydni';
  const config = {
    method: 'POST',
    body: JSON.stringify({ dniStudent: dni }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await fetch(url, config);
  if (res.status === 200) {
    return res.json();
  }
  throw await res.json();
};

const isDniDuplicated = (student, dni, state) => {
  const { students } = state.income.representative;
  const currentDnis = Object.keys(students).map(
    studentKey => students[studentKey].dni
  );
  return student.idStudent || currentDnis.includes(dni);
};

const duplicatedAlert = () => {
  Swal.fire({
    title: 'La cedula ingresa ya se encuentra asignada.',
    text: '',
    icon: 'warning',
    confirmButtonText: 'Aceptar',
    customClass: {
      icon: 'icon-class',
      title: 'title-class'
    }
  });
};

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
      const students = await handleStudents(income.representative.students);
      console.log(students);
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
      'Content-Type': 'application/json',
      mode: 'no-cors'
    }
  };

  const res = await fetch(url, config);

  if (res.status === 400) {
    throw await res.json();
  } else if (res.status === 200) {
    return res.json();
  }
  return null;
};

const handleStudents = async students => {
  const finalStudents = {};
  for (const studentKey of Object.keys(students)) {
    if (studentKey > 0) finalStudents[studentKey] = students[studentKey];
    else {
      const url = 'http://localhost:3500/api/student';
      const config = {
        method: 'POST',
        body: JSON.stringify(students[studentKey]),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await fetch(url, config);
      if (res.status === 400) {
        throw await res.json();
      } else if (res.status === 200) {
        const resStudent = await res.json();
        finalStudents[resStudent.idStudent] = resStudent;
      }
    }
  }
  return finalStudents;
};
