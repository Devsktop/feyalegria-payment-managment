import {
  FETCH_STUDENTS,
  ADD_STUDENT,
  EDIT_STUDENT,
  IS_FETCHED_STUDENTS,
  IS_FETCHING_STUDENTS,
  FETCH_STUDENTSBYSECTION
} from '../actions/studentsActions';

const initialState = {
  students: {},
  joinedStudents: 0,
  insolventStudents: 0,
  solventStudents: 0
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        ...payload
      };

    case ADD_STUDENT: {
      const { idStudent } = payload.student;
      const student = { ...payload.student, idStudent };
      const students = {
        ...state.students,
        [idStudent]: student
      };
      return {
        ...state,
        students
      };
    }

    case EDIT_STUDENT: {
      const { student } = payload;
      const students = {
        ...state.students,
        [student.idStudent]: student
      };
      return {
        ...state,
        students
      };
    }

    case IS_FETCHED_STUDENTS:
      return {
        ...state,
        isFetching: payload
      };

    case IS_FETCHED_STUDENTS:
      return {
        ...state,
        isFetched: true
      };

    case FETCH_STUDENTSBYSECTION:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
}
