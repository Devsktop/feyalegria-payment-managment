import React from 'react';
import StudentRowBox from './StudentRowBox';
import JoinStudentAddButton from './JoinStudentAddButton';

const JoinStudents = () => {
  return (
    <div className="joinstudents">
      <h1 className="joinstudents_title">Inscripción de Estudiantes</h1>
      <h2 className="joinstudents_subtitle">
        Seleccione los estudiantes que desea inscribir
      </h2>
      <StudentRowBox />
      <JoinStudentAddButton />
    </div>
  );
};

export default JoinStudents;
