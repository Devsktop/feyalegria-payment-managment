import {
  SET_INCOME,
  UPDATE_REPRESENTATIVE,
  RESET_INCOME,
  RESET_REPRESENTATIVE,
  EXIST_REPRESENTATIVE
} from '../actions/incomeActions';

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
  },
  representativeExist: false
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

    case EXIST_REPRESENTATIVE:
      return { ...state, representativeExist: payload.exist };

    case RESET_INCOME:
      return initialState;

    case RESET_REPRESENTATIVE:
      return {
        ...state,
        representative: {
          ...state.representative,
          idRepresentative: 0,
          names: '',
          lastNames: '',
          phone: '',
          email: '',
          balance: 0,
          paidMonths: 0,
          inscription: false,
          students: {}
        }
      };

    default:
      return state;
  }
}
