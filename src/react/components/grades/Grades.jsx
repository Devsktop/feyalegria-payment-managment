import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const gradesSelector = state => state.grades.grades;

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

  const gradesData = [];
  Object.keys(grades).forEach(gradeKey => {
    gradesData.push({ ...grades[gradeKey], id: grades[gradeKey].idGrade });
  });

  const deleteRow = id => {
    dispatch(fetchGrades());
  };

  return (
    <div className="content-screen">
      <div className="gradesBox">
        <h1>Grados y Secciones</h1>
        {isEmpty ? (
          <h2>Agregue un grado</h2>
        ) : (
          <DataTable
            className="table"
            data={gradesData}
            properties={[
              'Año Escolar',
              'Secciones',
              'NO. Estudiantes',
              'NO. Representantes'
            ]}
            order={['grade', 'sections', 'sectionStudents', 'representatives']}
            deleteRow={deleteRow}
          />
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
