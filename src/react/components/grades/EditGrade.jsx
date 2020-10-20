import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
          editar grado
        </button>
      </form>
    </div>
  );
};

export default EditGrade;
