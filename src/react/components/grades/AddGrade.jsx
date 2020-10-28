import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { createGrade } from 'react/redux/actions/gradesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

const AddGrade = () => {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState('');
  const history = useHistory();

  const handleGrade = e => {
    setGrade(e.target.value);
  };

  const validateInputs = () => {
    if (grade.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const gradesSections = {
      1: {
        section: 'A',
        capacity: 30
      },
      2: {
        section: 'B',
        capacity: 25
      }
    };

    const newGrade = {
      scholarYear: grade,
      gradesSections
    };
    dispatch(createGrade(newGrade, history));
  };

  return (
    <div className="box">
      <form className="sweet-form grade-form" onSubmit={handleSubmit}>
        <h1 className="box_title">Grados y Secciones</h1>
        <Minput
          type="text"
          onChange={handleGrade}
          value={grade}
          label="Grado:"
        />
        <div className="button_container">
          <Button
            type="button"
            onClick={() => history.goBack()}
            text="volver"
          />
          <Button
            type="submit"
            disabled={validateInputs()}
            text="crear grado"
          />
        </div>
      </form>
    </div>
  );
};

export default AddGrade;
