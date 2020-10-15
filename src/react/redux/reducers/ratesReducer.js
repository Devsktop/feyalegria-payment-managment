import { FETCH_STUDENTS } from '../actions/studentsActions';

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
    default:
      return state;
  }
}
