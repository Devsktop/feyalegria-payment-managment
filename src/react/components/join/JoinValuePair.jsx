import React from 'react';
import { createSelector } from 'reselect';
// Actions
import {
  addConceptsInscription,
  updateConceptInscription,
  deleteConceptInscription
} from 'react/redux/actions/conceptsActions';

// Components
import AddValuePair from '../valuePair/AddValuePair';

// Selectors
const boxSelector = state => {
  const { concepts } = state;
  let paymentConcepts = {};

  Object.keys(concepts).forEach(concept => {
    if (concepts[concept].type === 'INSCRIPTION')
      paymentConcepts = { ...concepts[concept].paymentConcepts };
  });

  const paymentConceptsKeys = {};

  Object.keys(paymentConcepts).forEach(concept => {
    paymentConceptsKeys[concept] = concept;
  });

  return paymentConceptsKeys;
};

const joinConceptsSelector = createSelector(
  state => {
    const { concepts } = state;
    let paymentConcepts = {};

    Object.keys(concepts).forEach(concept => {
      if (concepts[concept].type === 'INSCRIPTION')
        paymentConcepts = { ...concepts[concept].paymentConcepts };
    });

    return paymentConcepts;
  },
  (_, id) => id,
  (paymentConcepts, id) => paymentConcepts[id]
);

const JoinValuePair = () => {
  return (
    <AddValuePair
      boxSelector={boxSelector}
      addPairAction={addConceptsInscription}
      changePairAction={updateConceptInscription}
      pairSelector={joinConceptsSelector}
      removePairAction={deleteConceptInscription}
      pairKeys={['concept', 'conceptPrice']}
      valueDecimal
      pairLabels={['Concepto', 'Precio']}
    />
  );
};

export default JoinValuePair;
