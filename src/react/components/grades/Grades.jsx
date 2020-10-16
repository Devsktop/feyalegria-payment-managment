import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';

// Components
import GradesTable from './GradesTable';

// Selectors
const gradesSelector = state => state.grades;

const Grades = () => {
  const dispatch = useDispatch();
  const grades = useSelector(gradesSelector);
  const isFetched = useSelector(state => state.grades.isFetched);
  const isFetching = useSelector(state => state.grades.isFetching);

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (!isFetched) {
    dispatch(fetchGrades());
  }

  let isEmpty = false;
  if (Object.keys(grades).length === 0) {
    isEmpty = true;
  }
  return (
    <div className="content-screen">
      <div className="box">
        <h1>Grados y Secciones</h1>
        {isEmpty ? (
          <GradesTable className="table" />
        ) : (
          <h2>Agregue un grado</h2>
        )}
        <Link className="" to="/addGrade">
          AGREGAR GRADO
        </Link>
      </div>
    </div>
  );
};

Grades.displayName = 'Grades';

export default Grades;
