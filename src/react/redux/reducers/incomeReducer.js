import {
  SET_INCOME,
  UPDATE_REPRESENTATIVE,
  RESET_INCOME,
  RESET_REPRESENTATIVE,
  ADD_STUDENT,
  EDIT_STUDENT,
  TOGGLE_STUDENT
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

    default:
      return state;
  }
}
