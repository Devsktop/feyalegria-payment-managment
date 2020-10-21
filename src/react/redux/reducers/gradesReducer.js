import {
  FETCH_GRADES,
  IS_FECTHING,
  IS_FECTHED,
  DELETE_GRADE,
  CREATE_GRADE,
  EDIT_GRADE
} from '../actions/gradesActions';

const initialState = {
  grades: {},
  isFetched: false,
  isFetching: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_GRADES:
      return {
        ...state,
        ...payload
      };

    case IS_FECTHING:
      return {
        ...state,
        isFetching: payload
      };

    case IS_FECTHED:
      return {
        ...state,
        isFetched: true
      };

    case DELETE_GRADE: {
      const grades = { ...state.grades };
      delete grades[payload.id];
      return {
        ...state,
        grades
      };
    }

    case CREATE_GRADE: {
      const { idGrade } = payload.grade;
      const grade = { ...payload.grade, idGrade };
      const grades = { ...state.grades, [idGrade]: grade };
      return {
        ...state,
        grades
      };
    }

    case EDIT_GRADE: {
      const { grade } = payload;
      const grades = { ...state.grades, [grade.idGrade]: grade };

      return {
        ...state,
        grades
      };
    }

    default:
      return state;
  }
}
