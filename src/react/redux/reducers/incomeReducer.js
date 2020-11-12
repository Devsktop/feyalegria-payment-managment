import { SET_INCOME, UPDATE_REPRESENTATIVE } from '../actions/incomeActions';

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
    idDniType: 1,
    students: {}
  },
  incomeBalance: {
    balance: 0,
    transference: true,
    cash: false,
    dolar: false
  },
  products: {},
  dniTypeById: {
    1: 'V',
    2: 'E',
    3: 'P',
    4: 'M'
  }
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_INCOME:
      return {
        ...state,
        income: payload.income
      };

    case UPDATE_REPRESENTATIVE:
      return {
        ...state,
        representative: { ...state.representative, ...payload.representative }
      };

    default:
      return state;
  }
}
