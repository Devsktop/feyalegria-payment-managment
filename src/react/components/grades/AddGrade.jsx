import React, { useState } from 'react';
<<<<<<< HEAD
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { createGrade } from 'react/redux/actions/gradesActions';
=======
>>>>>>> 98a7d80b5879c406b0cd48993fec467b82c395ce

// Components
import Minput from 'react/components/Minput';

// Import imgs
import plus from './plus.svg';

<<<<<<< HEAD
// Selectors
const gradesSelector = state => state.grades.grades;

const AddGrade = () => {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState('');

  const handleGrade = e => {
    setGrade(e.target.value);
=======
const AddGrade = () => {
  const [grade, setGrade] = useState('');

  const avoidSpaces = value => {
    if (value.endsWith(' ')) return false;
    return true;
  };

  const handleGrade = e => {
    if (avoidSpaces(e.target.value)) setGrade(e.target.value);
>>>>>>> 98a7d80b5879c406b0cd48993fec467b82c395ce
  };

  const validateInputs = () => {
    if (grade.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
<<<<<<< HEAD

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
    dispatch(createGrade(newGrade));
=======
>>>>>>> 98a7d80b5879c406b0cd48993fec467b82c395ce
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
