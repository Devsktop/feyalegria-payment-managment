import {
  FETCH_CONCEPTS,
  ADD_CONCEPTS_INSCRPTION,
  UPDATE_CONCEPTS_INSCRPTION,
  DELETE_CONCEPTS_INSCRPTION,
  RESTORE_CONCEPTS_INSCRPTION,
  CLEAN_DELETED,
  UPDATE_CONCEPTS,
  UPDATE_PRICE_INSCRIPTION
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
    case ADD_CONCEPTS_INSCRPTION: {
      let idInscription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idInscription = concept;
      });

      const newConcept = {
        ...payload.concept,
        idConcept: payload.concept.id,
        idRate: parseInt(idInscription, 10)
      };
      console.log(idInscription);

      delete newConcept.id;

      const paymentConcepts = {
        ...state[idInscription].paymentConcepts,
        [newConcept.idConcept]: newConcept
      };

      const concept = { ...state[idInscription], paymentConcepts };

      return {
        ...state,
        [idInscription]: concept
      };
    }

    case UPDATE_CONCEPTS_INSCRPTION: {
      let idInscription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idInscription = concept;
      });

      const newConcept = {
        ...payload.concept,
        idConcept: payload.concept.id,
        idRate: state[idInscription].paymentConcepts[payload.concept.id].idRate
      };
      delete newConcept.id;

      const paymentConcepts = {
        ...state[idInscription].paymentConcepts,
        [newConcept.idConcept]: newConcept
      };

      const concept = { ...state[idInscription], paymentConcepts };

      return {
        ...state,
        [idInscription]: concept
      };
    }
    case UPDATE_PRICE_INSCRIPTION: {
      let idInscription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idInscription = concept;
      });

      const newInscription = {
        ...state,
        [idInscription]: { ...state[idInscription], price: payload.price }
      };

      return {
        ...state,
        ...newInscription
      };
    }

    case DELETE_CONCEPTS_INSCRPTION: {
      let idInscription;

      Object.keys(state).forEach(concept => {
        if (state[concept].type === 'INSCRIPTION') idInscription = concept;
      });

      const paymentConcepts = {
        ...state[idInscription].paymentConcepts
      };

      delete paymentConcepts[payload.idConcept];

      const deleted = state.deleted ? [...state.deleted] : [];
      if (payload.idConcept > 0) deleted.push(payload.idConcept);

      const concept = { ...state[idInscription], paymentConcepts };

      return {
        ...state,
        deleted,
        [idInscription]: concept
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

    case UPDATE_CONCEPTS: {
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
