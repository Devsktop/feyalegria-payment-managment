import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { restoreConceptInscription } from 'react/redux/actions/conceptsActions';

// Helper
import { decimalValidator } from 'helper';

// Components
import Minput from 'react/components/Minput';
import JoinValuePair from './JoinValuePair';

// Selector

const initialPriceSelector = state => {
  const { rates } = state;
  let initialPrice = {};

  Object.keys(rates).forEach(rate => {
    if (rates[rate].type === 'INSCRIPTION') initialPrice = rates[rate].price;
  });

  return initialPrice;
};

const conceptValidator = state => {
  const { concepts } = state;
  let paymentConcepts = {};

  Object.keys(concepts).forEach(concept => {
    if (concepts[concept].type === 'INSCRIPTION')
      paymentConcepts = { ...concepts[concept].paymentConcepts };
  });

  let isValid = true;

  Object.keys(paymentConcepts).forEach(concept => {
    // To get input to work when its value ends at 0 or it is empty
    // it is set to string, so parse it to float (cause it can be float or integuer)
    // and if it is empy will result in -1 that is not valid
    const conceptPrice =
      parseFloat(paymentConcepts[concept].conceptPrice) || -1;
    if (paymentConcepts[concept].concept === '' || conceptPrice < 0)
      isValid = false;
  });

  return isValid;
};

const Join = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialPrice = useSelector(initialPriceSelector);
  const isConceptValid = useSelector(conceptValidator);
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    return () => {
      dispatch(restoreConceptInscription());
    };
  }, []);

  const handleKeyDown = e => {
    setPrice(decimalValidator(e, price));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleGoBack = () => {
    history.goBack();
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

        <JoinValuePair />

        <div className="button_container">
          <button
            type="button"
            className="button button-cancel"
            onClick={handleGoBack}
          >
            Volver
          </button>
          <button
            type="submit"
            className="button button-accept"
            disabled={
              price === '' || !(parseFloat(price) > 0) || !isConceptValid
            }
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
