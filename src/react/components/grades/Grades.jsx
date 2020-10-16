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
