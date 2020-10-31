import React from 'react';
import { createSelector } from 'reselect';
// Actions
import {
  addConcepts,
  updateConcept,
  deleteConcept
} from 'react/redux/actions/conceptsActions';

// Components
import AddValuePair from '../valuePair/AddValuePair';

// Selectors
const boxSelector = state => {
  const { mirrorGrade: gradesSection } = state;
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

const GradeValuePair = () => {
  return (
    <AddValuePair
      boxSelector={boxSelector}
      addPairAction={addConcepts}
      changePairAction={updateConcept}
      pairSelector={joinConceptsSelector}
      removePairAction={deleteConcept}
      pairKeys={['concept', 'conceptPrice']}
      valueDecimal
      pairLabels={['Sección', 'Capacidad']}
      type=""
    />
  );
};

export default React.memo(GradeValuePair);
