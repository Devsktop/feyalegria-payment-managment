import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Components
import Button from 'react/components/Button';

// SELECTOR
const priceSelector = state => {
  const { concepts } = state;
  let price = {};

  Object.keys(concepts).forEach(concept => {
    if (concepts[concept].type === 'MONTHLYPAYMENT')
      price = concepts[concept].price;
  });
  return price;
};

const conceptValidator = state => {
  const { concepts } = state;
  let paymentConcepts = {};

  Object.keys(concepts).forEach(concept => {
    if (concepts[concept].type === 'MONTHLYPAYMENT')
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

const JoinButtons = () => {
  const history = useHistory();
  const isConceptValid = useSelector(conceptValidator);
  const price = useSelector(priceSelector);
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <div className="button_container">
      <Button type="button" onClick={handleGoBack} text="Volver" />
      <Button
        type="submit"
        disabled={price === '' || !(parseFloat(price) > 0) || !isConceptValid}
        text="Aceptar"
      />
    </div>
  );
};

export default JoinButtons;
