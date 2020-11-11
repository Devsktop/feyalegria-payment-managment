import {
  FETCH_CONCEPTS,
  ADD_CONCEPTS,
  UPDATE_CONCEPTS,
  DELETE_CONCEPTS,
  RESTORE_CONCEPTS_INSCRPTION,
  CLEAN_DELETED,
  UPDATE_CONCEPTS_RATES,
  UPDATE_PRICE
} from '../actions/conceptsActions';

// Concepts is internally equal to rates reducer, buty this is used to manipuale
// and edit concepts before saving
const initialState = {
  deleted: []
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CONCEPTS:
      return {
        ...state,
        ...payload.rates
      };
    case ADD_CONCEPTS: {
      let idRate;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === payload.type) idRate = concept;
      });

      const newConcept = {
        ...payload.concept,
        idConcept: payload.concept.id,
        idRate: parseInt(idRate, 10)
      };
      console.log(idRate);

      delete newConcept.id;

      const paymentConcepts = {
        ...state[idRate].paymentConcepts,
        [newConcept.idConcept]: newConcept
      };

      const concept = { ...state[idRate], paymentConcepts };

      return {
        ...state,
        [idRate]: concept
      };
    }

    case UPDATE_CONCEPTS: {
      let idRate;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === payload.type) idRate = concept;
      });

      const newConcept = {
        ...payload.concept,
        idConcept: payload.concept.id,
        idRate: state[idRate].paymentConcepts[payload.concept.id].idRate
      };
      delete newConcept.id;

      const paymentConcepts = {
        ...state[idRate].paymentConcepts,
        [newConcept.idConcept]: newConcept
      };

      const concept = { ...state[idRate], paymentConcepts };

      return {
        ...state,
        [idRate]: concept
      };
    }
    case UPDATE_PRICE: {
      let idRate;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === payload.type) idRate = concept;
      });

      const newInscription = {
        ...state,
        [idRate]: { ...state[idRate], price: payload.price }
      };

      return {
        ...state,
        ...newInscription
      };
    }

    case DELETE_CONCEPTS: {
      let idRate;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === payload.type) idRate = concept;
      });

      const paymentConcepts = {
        ...state[idRate].paymentConcepts
      };

      delete paymentConcepts[payload.idConcept];

      const deleted = state.deleted ? [...state.deleted] : [];
      if (payload.idConcept > 0) deleted.push(payload.idConcept);

      const concept = { ...state[idRate], paymentConcepts };

      return {
        ...state,
        deleted,
        [idRate]: concept
      };
    }
    case RESTORE_CONCEPTS_INSCRPTION:
      return {
        ...payload.rates,
        deleted: []
      };

    case CLEAN_DELETED:
      return {
        ...state,
        deleted: []
      };

    case UPDATE_CONCEPTS_RATES: {
      const { rate } = payload;
      console.log(rate);
      const rates = { ...state, [rate.idRate]: { ...rate } };

      return {
        ...state,
        ...rates
      };
    }
    default:
      return state;
  }
}
