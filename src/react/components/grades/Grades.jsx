import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchGrades, deleteGrade } from 'react/redux/actions/gradesActions';

// Components
import Button from 'react/components/Button';
import { DataTable } from 'react-pulpo';

// Selectors
const gradesSelector = state => state.grades.grades;

const Grades = () => {
  const dispatch = useDispatch();
  const grades = useSelector(gradesSelector);
  const isFetched = useSelector(state => state.grades.isFetched);
  const isFetching = useSelector(state => state.grades.isFetching);
  const history = useHistory();

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

  const handleDelete = id => dispatch(deleteGrade(id));

  const handleClick = id => history.push(`/editGrade/${id}`);

  return (
    <div className="content-screen">
      <div className="box gradesBox">
        <h1 className="box_title">Grados y Secciones</h1>
        {isEmpty ? (
          <h2 className="box_subtitle">
            No hay grados registrados
            <br />
            Presiona
            <span> Agregar grado</span>
          </h2>
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
            order={[
              'scholarYear',
              'sectionsNumber',
              'gradeStudents',
              'gradeRepresentatives'
            ]}
            deleteRow={handleDelete}
            onClickRow={handleClick}
          />
        )}
        <Button link="/addGrade" text="Añadir Grado" />
      </div>
    </div>
  );
};

Grades.displayName = 'Grades';

export default Grades;
