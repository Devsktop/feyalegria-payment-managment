import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';

// Helper
import { decimalValidator } from 'helper';

// Actions
import {
  addConceptsInscription,
  updateConceptInscription,
  deleteConceptInscription
} from 'react/redux/actions/conceptsActions';

// Components
import Minput from 'react/components/Minput';
import AddValuePair from './AddValuePair';

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

const Join = () => {
  const [price, setPrice] = useState('');

  const handleKeyDown = e => {
    setPrice(decimalValidator(e, price));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="join content-screen">
      <form className="sweet-form box" onSubmit={handleSubmit}>
        <h1 className="box_title">Administre Inscripcrión</h1>
        <Minput
          type="text"
          onChange={() => {}}
          onKeyDown={handleKeyDown}
          value={price}
          label="Ingrese precio de la matrícula:"
        />
        <AddValuePair
          boxSelector={boxSelector}
          addPairAction={addConceptsInscription}
          changePairAction={updateConceptInscription}
          pairSelector={joinConceptsSelector}
          removePairAction={deleteConceptInscription}
          pairKeys={['concept', 'price']}
          valueDecimal
          pairLabels={['Concepto', 'Precio']}
        />

        <div className="button_container">
          <Link className="button button-cancel" to="/Config">
            Volver
          </Link>
          <button
            type="submit"
            className="button button-accept"
            disabled={price === '' || !(parseFloat(price) > 0)}
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

Join.displayName = 'Join';

export default Join;
