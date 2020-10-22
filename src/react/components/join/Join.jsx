import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

const Join = () => {
  const initialPrice = useSelector(initialPriceSelector);
  const [price, setPrice] = useState(initialPrice);

  const handleKeyDown = e => {
    setPrice(decimalValidator(e, price));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleGoBack = () => {};

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
