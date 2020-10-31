/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import {
  updateMirrorscholarYear,
  restoreMirrorGrade
} from 'react/redux/actions/mirrorGradeActions';
import { editGrade } from 'react/redux/actions/gradesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import GradeValuePair from './GradeValuePair';

const EditGrade = () => {
  const dispatch = useDispatch();
  const grade = useSelector(state => state.mirrorGrade.grade);
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
    dispatch(editGrade(history));
  };

  const handleGoBack = () => {
    dispatch(restoreMirrorGrade());
    history.goBack();
  };

  return (
    <div className="box grade_box">
      <form className="sweet-form grade_form" onSubmit={handleSubmit}>
        <h1 className="box_title">Grados y Secciones</h1>
        <Minput
          type="text"
          onChange={handleGrade}
          value={grade.scholarYear}
          label="Grado:"
        />
        <GradeValuePair />
        <div className="button_container">
          <Button type="button" text="volver" onClick={handleGoBack} />
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

export default EditGrade;
