import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// Actions
import { editGrade } from 'react/redux/actions/gradesActions';

// Components
import Minput from 'react/components/Minput';

// Import imgs
import plus from './plus.svg';

const EditGrade = props => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  // Selector
  const currentGrade = useSelector(state => state.grades.grades[id]);
  const [grade, setGrade] = useState(currentGrade.scholarYear);
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
        idSection: 1,
        section: 'A',
        capacity: 30
      },
      2: {
        idSection: 2,
        section: 'B',
        capacity: 25
      }
    };

    const newGrade = {
      idGrade: id,
      scholarYear: grade,
      gradesSections
    };
    dispatch(editGrade(newGrade));
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
          <button
            type="button"
            className="button"
            onClick={() => history.goBack()}
          >
            volver
          </button>
          <button type="submit" className="button" disabled={validateInputs()}>
            editar producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGrade;
