export const FETCH_STUDENTS = 'FETCH_STUDENTS';

export const fetchStudents = async () => {
  const response = await fetch('http://localhost:3500/api/students');
  const students = await response.json();
  return {
    type: FETCH_STUDENTS,
    payload: students
  };
};
