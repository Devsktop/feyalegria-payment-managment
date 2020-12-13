import {
  SET_INCOME,
  UPDATE_REPRESENTATIVE,
  RESET_INCOME,
  RESET_REPRESENTATIVE,
  ADD_STUDENT,
  EDIT_STUDENT,
  TOGGLE_STUDENT,
  TOGGLE_PAYMETN_METHOD,
  UPDATE_TRANSFERENCE,
  UPDATE_CASH,
  UPDATE_DOLAR
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
    transferenceAmount: 0,
    transferenceRef: '',
    cash: false,
    cashAmount: 0,
    dolar: false,
    dolarAmount: 0
  },
  products: {},
  dniTypeById: {
    1: 'V',
    2: 'E',
    3: 'P',
    4: 'M'
  },
  representativeExist: false,
  idNewStudent: -1
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
        representative: { ...state.representative, ...payload.representative },
        representativeExist: payload.exist
      };

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

    case ADD_STUDENT: {
      const representative = {
        ...state.representative,
        students: {
          ...state.representative.students,
          [state.idNewStudent]: {
            idStudent: state.idNewStudent,
            ...payload.student,
            willJoin: false
          }
        }
      };

      const idNewStudent = state.idNewStudent - 1;
      return {
        ...state,
        representative,
        idNewStudent
      };
    }

    case EDIT_STUDENT: {
      const representative = {
        ...state.representative,
        students: {
          ...state.representative.students,
          [payload.student.idStudent]: {
            idStudent: payload.student.idStudent,
            ...payload.student,
            willJoin: false
          }
        }
      };

      return {
        ...state,
        representative
      };
    }

    case TOGGLE_STUDENT: {
      const students = { ...state.representative.students };
      students[payload.idStudent].willJoin = payload.toggle;

      return {
        ...state,
        representative: { ...state.representative, students }
      };
    }

    case TOGGLE_PAYMETN_METHOD: {
      const transference =
        payload.method === 'transference'
          ? !state.incomeBalance.transference
          : state.incomeBalance.transference;
      const dolar =
        payload.method === 'dolar'
          ? !state.incomeBalance.dolar
          : state.incomeBalance.dolar;
      const cash =
        payload.method === 'cash'
          ? !state.incomeBalance.cash
          : state.incomeBalance.cash;

      const incomeBalance = {
        ...state.incomeBalance,
        transference,
        dolar,
        cash
      };

      return {
        ...state,
        incomeBalance
      };
    }

    case UPDATE_TRANSFERENCE: {
      return {
        ...state,
        incomeBalance: {
          ...state.incomeBalance,
          transferenceAmount: payload.amount,
          transferenceRef: payload.ref
        }
      };
    }

    case UPDATE_CASH: {
      return {
        ...state,
        incomeBalance: {
          ...state.incomeBalance,
          cashAmount: payload.amount
        }
      };
    }

    case UPDATE_DOLAR: {
      return {
        ...state,
        incomeBalance: {
          ...state.incomeBalance,
          dolarAmount: payload.amount
        }
      };
    }
    default:
      return state;
  }
}
