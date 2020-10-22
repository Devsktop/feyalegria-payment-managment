import {
  FETCH_CONCEPTS,
  ADD_CONCEPTS_INSCRPTION,
  UPDATE_CONCEPTS_INSCRPTION,
  DELETE_CONCEPTS_INSCRPTION,
  RESTORE_CONCEPTS_INSCRPTION
} from '../actions/conceptsActions';

// Concepts is internally equal to rates reducer, buty this is used to manipuale
// and edit concepts before saving
const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CONCEPTS:
      return {
        ...state,
        ...payload.rates
      };
    case ADD_CONCEPTS_INSCRPTION: {
      let idIncription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idIncription = concept;
      });

      const newConcept = { ...payload.concept, idConcept: payload.concept.id };
      delete newConcept.id;

      const paymentConcepts = {
        ...state[idIncription].paymentConcepts,
        [newConcept.idConcept]: newConcept
      };

      const concept = { ...state[idIncription], paymentConcepts };

      return {
        ...state,
        [idIncription]: concept
      };
    }

    case UPDATE_CONCEPTS_INSCRPTION: {
      let idIncription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idIncription = concept;
      });

      const newConcept = { ...payload.concept, idConcept: payload.concept.id };
      delete newConcept.id;

      const paymentConcepts = {
        ...state[idIncription].paymentConcepts,
        [newConcept.idConcept]: newConcept
      };

      const concept = { ...state[idIncription], paymentConcepts };

      return {
        ...state,
        [idIncription]: concept
      };
    }

    case DELETE_CONCEPTS_INSCRPTION: {
      let idIncription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idIncription = concept;
      });

      const paymentConcepts = {
        ...state[idIncription].paymentConcepts
      };

      delete paymentConcepts[payload.idConcept];

      const concept = { ...state[idIncription], paymentConcepts };

      return {
        ...state,
        [idIncription]: concept
      };
    }
    case RESTORE_CONCEPTS_INSCRPTION:
      return {
        ...payload.rates
      };
    default:
      return state;
  }
}
