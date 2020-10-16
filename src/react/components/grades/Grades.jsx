import { objectOf } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import GradesTable from './GradesTable';

// Selectors
const gradesSelector = state => state.students;

const Grades = () => {
  const grades = useSelector(gradesSelector);
  let isEmpty = false;
  if (Object.keys(grades).length === 0) {
    isEmpty = true;
  }
  return (
    <div className="grades content-screen">
      <h1>Grados y Secciones</h1>
      {isEmpty ? <h2>Agregue un grado</h2> : <GradesTable />}
      <Link className="" to="/AddGrade">
        AGREGAR GRADO
      </Link>
    </div>
  );
};

Grades.displayName = 'Grades';

export default Grades;
