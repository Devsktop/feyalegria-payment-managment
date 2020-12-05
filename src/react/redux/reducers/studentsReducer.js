import {
  FETCH_STUDENTS,
  ADD_STUDENT,
  EDIT_STUDENT
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

    default:
      return state;
  }
}
