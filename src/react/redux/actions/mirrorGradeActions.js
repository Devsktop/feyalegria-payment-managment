export const SET_MIRROR_GRADE = 'SET_MIRROR_GRADE';

export const setMirrorGrade = grade => ({
  type: SET_MIRROR_GRADE,
  payload: { grade }
});

export const UPDATE_CONCEPTS_RATES = 'UPDATE_CONCEPTS_RATES';

export const updateConcepts = rate => ({
  type: UPDATE_CONCEPTS_RATES,
  payload: { rate }
});

export const ADD_MIRROR_SECTION = 'ADD_MIRROR_SECTION';

export const addMirrorSection = section => ({
  type: ADD_MIRROR_SECTION,
  payload: { section }
});

export const UPDATE_MIRROR_SECTION = 'UPDATE_MIRROR_SECTION';

export const updateMirrorSection = section => ({
  type: UPDATE_MIRROR_SECTION,
  payload: { section }
});

export const UPDATE_MIRROR_SCHOLARYEAR = 'UPDATE_MIRROR_SCHOLARYEAR';

export const updateMirrorPrice = scholarYear => ({
  type: UPDATE_MIRROR_SCHOLARYEAR,
  payload: { scholarYear }
});

export const DELETE_MIRROR_SECTION = 'DELETE_MIRROR_SECTION';

export const deleteMirrorSection = idSeciton => ({
  type: DELETE_MIRROR_SECTION,
  payload: { idSeciton }
});

export const RESTORE_MIRROR_GRADE = 'RESTORE_MIRROR_GRADE';

export const restoreConceptInscription = () => {
  return (dispatch, getState) => {
    const { rates } = getState();
    dispatch({
      type: RESTORE_MIRROR_GRADE,
      payload: { rates }
    });
  };
};
