import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Helper
import { decimalValidator } from 'helper';

// Components
import Minput from 'react/components/Minput';
import AddPaymentConcepts from './AddPaymentConcepts';

const Join = () => {
  const [price, setPrice] = useState('');

  const handleKeyDown = e => {
    setPrice(decimalValidator(e, price));
  };
  const mulaOnChange = e => {};

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="join content-screen">
      <form className="sweet-form" onSubmit={handleSubmit}>
        <h1 className="box_title">Administre Inscripcrión</h1>
        <Minput
          type="text"
          onChange={mulaOnChange}
          onKeyDown={handleKeyDown}
          value={price}
          label="Ingrese precio de la matrícula:"
        />
        <AddPaymentConcepts />
        <div className="button_container">
          <button
            type="submit"
            className="button button-accept"
            disabled={price === '' || !(parseFloat(price) > 0)}
          >
            Aceptar
          </button>
          <Link className="button button-cancel" to="/Config">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};

Join.displayName = 'Join';

export default Join;
