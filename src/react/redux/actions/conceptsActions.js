export const FETCH_CONCEPTS = 'FETCH_CONCEPTS';

export const fetchConcepts = rates => ({
  type: FETCH_CONCEPTS,
  payload: { rates }
});
export const UPDATE_CONCEPTS_RATES = 'UPDATE_CONCEPTS_RATES';

export const updateConcepts = rate => ({
  type: UPDATE_CONCEPTS_RATES,
  payload: { rate }
});

export const ADD_CONCEPTS = 'ADD_CONCEPTS';

export const addConcepts = (concept, type) => ({
  type: ADD_CONCEPTS,
  payload: { concept, type }
});

export const UPDATE_CONCEPTS = 'UPDATE_CONCEPTS';

export const updateConcept = (concept, type) => ({
  type: UPDATE_CONCEPTS,
  payload: { concept, type }
});

export const UPDATE_PRICE = 'UPDATE_PRICE';

export const updatePrice = (price, type) => ({
  type: UPDATE_PRICE,
  payload: { price, type }
});

export const DELETE_CONCEPTS = 'DELETE_CONCEPTS';

export const deleteConcept = (idConcept, type) => ({
  type: DELETE_CONCEPTS,
  payload: { idConcept, type }
});

export const RESTORE_CONCEPTS_INSCRPTION = 'RESTORE_CONCEPTS_INSCRPTION';

export const restoreConceptInscription = () => {
  return (dispatch, getState) => {
    const { rates } = getState();
    dispatch({
      type: RESTORE_CONCEPTS_INSCRPTION,
      payload: { rates }
    });
  };
};

export const CLEAN_DELETED = 'CLEAN_DELETED';

export const cleanDeleted = () => ({
  type: CLEAN_DELETED
});
