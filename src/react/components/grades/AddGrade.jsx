import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { createGrade } from 'react/redux/actions/gradesActions';
import {
  updateMirrorscholarYear,
  restoreMirrorGrade
} from 'react/redux/actions/mirrorGradeActions';
// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import GradeValuePair from './GradeValuePair';

// Selectors
const validSectionsSelector = state => {
  const { gradesSections } = state.mirrorGrade.grade;

  let disable = false;

  Object.keys(gradesSections).forEach(sectionPair => {
    const { section, capacity } = gradesSections[sectionPair];
    if (section.length < 1 || capacity < 1) disable = true;
  });

  return disable;
};

const AddGrade = () => {
  const dispatch = useDispatch();
  const grade = useSelector(state => state.mirrorGrade.grade.scholarYear);
  const validSections = useSelector(validSectionsSelector);
  const history = useHistory();

  const handleGrade = e => {
    dispatch(updateMirrorscholarYear(e.target.value));
  };

  const disableButton = () => {
    if (grade.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createGrade(history));
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
          value={grade}
          label="Grado:"
        />
        <GradeValuePair />
        <div className="button_container">
          <Button type="button" onClick={handleGoBack} text="volver" />
          <Button
            type="submit"
            disabled={disableButton() || validSections}
            text="crear grado"
          />
        </div>
      </form>
    </div>
  );
};

export default AddGrade;
