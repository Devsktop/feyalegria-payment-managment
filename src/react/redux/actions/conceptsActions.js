export const FETCH_CONCEPTS = 'FETCH_CONCEPTS';

export const setConcepts = rates => ({
  type: FETCH_CONCEPTS,
  payload: rates
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

export const DELETE_CONCEPTS_INSCRPTION = 'DELETE_CONCEPTS_INSCRPTION';

export const deleteConceptInscription = idConcept => ({
  type: DELETE_CONCEPTS_INSCRPTION,
  payload: { idConcept }
});
