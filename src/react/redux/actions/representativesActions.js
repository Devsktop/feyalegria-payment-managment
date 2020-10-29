export const FETCH_REPRESENTATIVEBYDNI = 'FETCH_REPRESENTATIVEBYDNI';

export const fetchRepresentativeByDni = (dni, history) => {
  return async dispatch => {
    // HACER FETCH A LA BDD
    const res = await fetch(
      `http://localhost:3500/api/representativesbydni/${dni}`
    );

    const { representative, status } = await res.json();

    if (status === 200) {
      const hasStudents = Object.keys(representative.students).length > 0;
      if (hasStudents) {
        history.push('/joinStudents');
      } else {
        history.push('/addStudent');
      }
    } else if (status === 404) {
      history.push('/addRepresentative');
    } else {
      console.log('remember swal');
    }
    dispatch(fetchRepresentativeByIdActions(representative));
  };
};

const fetchRepresentativeByIdActions = representative => ({
  type: FETCH_REPRESENTATIVEBYDNI,
  payload: { representative }
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
