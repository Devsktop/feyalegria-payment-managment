import React, { useState } from 'react';

// Components
import Minput from 'react/components/Minput';

// Import imgs
import plus from './plus.svg';

const AddGrade = () => {
  const [grade, setGrade] = useState('');

  const avoidSpaces = value => {
    if (value.endsWith(' ')) return false;
    return true;
  };

  const handleGrade = e => {
    if (avoidSpaces(e.target.value)) setGrade(e.target.value);
  };

  const validateInputs = () => {
    if (grade.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="addGradesBox">
      <form className="sweet-form" onSubmit={handleSubmit}>
        <h1>Grados y Secciones</h1>
        <Minput
          type="text"
          onChange={handleGrade}
          value={grade}
          label="Grado:"
        />
        <div className="form_group">
          <label>Añadir Sección</label>
          <button className="btn_plus" type="button">
            <img src={plus} alt="+" />
          </button>
        </div>
        <button
          type="submit"
          className="button button-large button-accept"
          disabled={validateInputs()}
        >
          CREAR GRADO
        </button>
      </form>
    </div>
  );
};

export default AddGrade;
