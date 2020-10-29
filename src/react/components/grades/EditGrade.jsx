/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// Actions
import { editGrade } from 'react/redux/actions/gradesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

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
    dispatch(editGrade(newGrade, history));
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
            text="volver"
            onClick={() => history.goBack()}
          />
          <Button
            type="submit"
            text="editar grado"
            disabled={validateInputs()}
          />
        </div>
      </form>
    </div>
  );
};

EditGrade.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.number.isRequired
};

export default EditGrade;
