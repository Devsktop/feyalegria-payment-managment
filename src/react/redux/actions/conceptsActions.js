export const FETCH_CONCEPTS = 'FETCH_CONCEPTS';

export const fetchConcepts = rates => ({
  type: FETCH_CONCEPTS,
  payload: { rates }
});
export const UPDATE_CONCEPTS = 'UPDATE_CONCEPTS';

export const updateConcepts = rate => ({
  type: UPDATE_CONCEPTS,
  payload: { rate }
});

export const ADD_CONCEPTS_INSCRPTION = 'ADD_CONCEPTS_INSCRPTION';

export const addConceptsInscription = concept => ({
  type: ADD_CONCEPTS_INSCRPTION,
  payload: { concept }
});

export const UPDATE_CONCEPTS_INSCRPTION = 'UPDATE_CONCEPTS_INSCRPTION';

export const updateConceptInscription = concept => ({
  type: UPDATE_CONCEPTS_INSCRPTION,
  payload: { concept }
});

export const UPDATE_PRICE_INSCRIPTION = 'UPDATE_PRICE_INSCRIPTION';

export const updatePriceInscription = price => ({
  type: UPDATE_PRICE_INSCRIPTION,
  payload: { price }
});

export const DELETE_CONCEPTS_INSCRPTION = 'DELETE_CONCEPTS_INSCRPTION';

export const deleteConceptInscription = idConcept => ({
  type: DELETE_CONCEPTS_INSCRPTION,
  payload: { idConcept }
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
