import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import {
  restoreConceptInscription,
  updatePriceInscription
} from 'react/redux/actions/conceptsActions';
import { updateRate } from 'react/redux/actions/ratesActions';

// Helper
import { decimalValidator } from 'helper';

// Components
import Minput from 'react/components/Minput';
import Button from 'react/components/Button';
import JoinValuePair from './JoinValuePair';

// Selector

const priceSelector = state => {
  const { concepts } = state;
  let price = {};

  Object.keys(concepts).forEach(concept => {
    if (concepts[concept].type === 'INSCRIPTION')
      price = concepts[concept].price;
  });
  return price;
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
  const price = useSelector(priceSelector);
  const isConceptValid = useSelector(conceptValidator);

  useEffect(() => {
    return () => {
      dispatch(restoreConceptInscription());
    };
  }, []);

  const handleKeyDown = e => {
    dispatch(updatePriceInscription(decimalValidator(e, price)));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateRate('INSCRIPTION'));
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="join content-screen">
      <form className="sweet-form box inscriptionBox" onSubmit={handleSubmit}>
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
          <Button type="button" onClick={handleGoBack} text="Volver" />
          <Button
            type="submit"
            disabled={
              price === '' || !(parseFloat(price) > 0) || !isConceptValid
            }
            text="Aceptar"
          />
        </div>
      </form>
    </div>
  );
};

Join.displayName = 'Join';

export default Join;
