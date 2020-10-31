import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { createGrade } from 'react/redux/actions/gradesActions';
import { updateMirrorscholarYear } from 'react/redux/actions/mirrorGradeActions';
// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import GradeValuePair from './GradeValuePair';

const AddGrade = () => {
  const dispatch = useDispatch();
  const grade = useSelector(state => state.mirrorGrade.grade.scholarYear);
  const history = useHistory();

  const handleGrade = e => {
    dispatch(updateMirrorscholarYear(e.target.value));
  };

  const validateInputs = () => {
    if (grade.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createGrade(history));
  };

  return (
    <div className="box grade_box">
      <form className="sweet-form grade_form" onSubmit={handleSubmit}>
        <h1 className="box_title">Grados y Secciones</h1>
        <Minput
          type="text"
          onChange={handleGrade}
          value={grade}
          label="Grado:"
        />
        <GradeValuePair />
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
