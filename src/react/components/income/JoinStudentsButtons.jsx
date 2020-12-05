import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// components
import Button from 'react/components/Button';

const studentsValidSelector = state => {
  const { students } = state.income.representative;
  let disabled = true;
  Object.keys(students).forEach(studentKey => {
    if (students[studentKey].willJoin) disabled = false;
  });
  return disabled;
};

const JoinStudentsButton = () => {
  const studentValid = useSelector(studentsValidSelector);
  const history = useHistory();
  return (
    <div className="joinstudents_buttons">
      <Button link="/verifyRepresentative" text="Volver" />
      <Button
        onClick={() => history.push('/incomePayment')}
        text="Inscribir"
        disabled={studentValid}
      />
    </div>
  );
};

export default JoinStudentsButton;
