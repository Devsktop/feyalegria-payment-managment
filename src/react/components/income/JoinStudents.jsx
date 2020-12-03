import React from 'react';

// Components
import StudentRowBox from './StudentRowBox';
import JoinStudentAddButton from './JoinStudentAddButton';
import JoinStudentPrice from './JoinStudentsPrice';

const JoinStudents = () => {
  return (
    <div className="joinstudents">
      <h1 className="joinstudents_title">Inscripción de Estudiantes</h1>
      <h2 className="joinstudents_subtitle">
        Seleccione los estudiantes que desea inscribir
      </h2>
      <StudentRowBox />
      <JoinStudentAddButton />
      <div className="joinstudents_bottom">
        <JoinStudentPrice />
      </div>
    </div>
  );
};

export default JoinStudents;
