export const FETCH_GRADES = 'FETCH_GRADES';

export const fetchGrades = () => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch('http://localhost:3500/api/grades');
    const grades = await response.json();
    console.log(grades);
    dispatch(fetchGradesActions(grades));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchGradesActions = grades => ({
  type: FETCH_GRADES,
  payload: { grades }
});

export const IS_FECTHING = 'IS_FECTHING';

// fetching: boolean
const isFetching = fetching => ({
  type: IS_FECTHING,
  payload: fetching
});

export const IS_FECTHED = 'IS_FECTHED';

// fetched: boolean
const isFetched = () => ({
  type: IS_FECTHED
});
