import { SET_INCOME } from '../actions/incomeActions';

const initialState = {
  income: '',
  representative: {
    idRepresentative: 0,
    names: '',
    lastNames: '',
    dni: '',
    phone: '',
    email: '',
    balance: 0,
    paidMonths: 0,
    inscription: false,
    idDniType: 1
  },
  students: {},
  currentBalance: {
    balance: 0,
    transference: true,
    cash: false,
    dolar: false
  },
  products: {}
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_INCOME:
      return {
        ...state,
        income: payload.income
      };

    default:
      return state;
  }
}
