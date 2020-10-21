import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Helper
import { decimalValidator } from 'helper';

// Components
import Minput from 'react/components/Minput';
import JoinValuePair from './JoinValuePair';

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

        <JoinValuePair />
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
