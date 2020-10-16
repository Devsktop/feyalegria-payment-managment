export const FETCH_GRADES = 'FETCH_GRADES';

export const fetchGrades = async () => {
  const response = await fetch('http://localhost:3500/api/grades');
  const grades = await response.json();
  return {
    type: FETCH_GRADES,
    payload: grades
  };
};
