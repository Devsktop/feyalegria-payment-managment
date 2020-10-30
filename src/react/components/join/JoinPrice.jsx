import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Minput from 'react/components/Minput';

// Actions
import { updatePriceInscription } from 'react/redux/actions/conceptsActions';

// Helper
import { decimalValidator } from 'helper';

// SELECTOR
const priceSelector = state => {
  const { concepts } = state;
  let price = {};

  Object.keys(concepts).forEach(concept => {
    if (concepts[concept].type === 'INSCRIPTION')
      price = concepts[concept].price;
  });
  return price;
};

const JoinPrice = () => {
  const dispatch = useDispatch();
  const price = useSelector(priceSelector);

  const handleKeyDown = e => {
    dispatch(updatePriceInscription(decimalValidator(e, price)));
  };

  return (
    <Minput
      type="text"
      onChange={() => {}}
      onKeyDown={handleKeyDown}
      value={price}
      label="Ingrese precio de la matrícula:"
    />
  );
};

export default JoinPrice;
