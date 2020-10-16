import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Minput from 'react/components/Minput';

const Join = () => {
  const [price, setPrice] = useState('');

  const avoidSpaces = value => {
    if (value.endsWith(' ')) return false;
    return true;
  };

  const handlePrice = e => {
    if (avoidSpaces(e.target.value)) setPrice(e.target.value);
  };

  const validateInputs = () => {
    if (price.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="grades content-screen">
      <h1>Administre Inscripcrión</h1>
      <form className="sweet-form" onSubmit={handleSubmit}>
        <Minput
          type="number"
          onChange={handlePrice}
          value={price}
          label="Ingrese precio de la matrícula:"
        />
        <button
          type="submit"
          className="button button-large button-accept"
          disabled={validateInputs()}
        >
          ACEPTAR
        </button>
      </form>
      <Link className="button" to="/Config">
        VOLVER
      </Link>
    </div>
  );
};

Join.displayName = 'Join';

export default Join;
