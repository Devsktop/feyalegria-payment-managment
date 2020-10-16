import React, { useState } from 'react';

// Components
import Minput from 'react/components/Minput';

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
    <form className="sweet-form" onSubmit={handleSubmit}>
      <Minput type="text" onChange={handleGrade} value={grade} label="Grado:" />
      <button
        type="submit"
        className="button button-large button-accept"
        disabled={validateInputs()}
      >
        CREAR GRADO
      </button>
    </form>
  );
};

export default AddGrade;
