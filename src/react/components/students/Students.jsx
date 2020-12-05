import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const gradesSelector = state => state.grades.grades;

const Students = () => {
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

  const sectionsByGrade = [];

  Object.keys(grades).forEach(gradeKey => {
    const { scholarYear, gradesSections } = grades[gradeKey];
    Object.keys(gradesSections).forEach(sectionKey => {
      const {
        section,
        sectionStudents,
        sectionRepresentatives
      } = gradesSections[sectionKey];
      sectionsByGrade[sectionKey] = {
        id: sectionKey,
        scholarYear,
        section,
        sectionStudents,
        sectionRepresentatives
      };
    });
  });

  const handleClick = id =>
    history.push(
      `/studentsByGrade/${id}?scholarYear=${sectionsByGrade[id].scholarYear}&section=${sectionsByGrade[id].section}`
    );

  return (
    <div className="content-screen">
      <div className="box representatives_box">
        <h1 className="box_title">Estudiantes</h1>
        <h2 className="box_subtitle">Seleccionar un año escolar</h2>
        {isEmpty ? (
          <h2 className="box_subtitle">No hay grados registrados</h2>
        ) : (
          <DataTable
            className="table"
            data={sectionsByGrade}
            properties={[
              'Año Escolar',
              'Sección',
              'No. Representantes',
              'No. Estudiantes'
            ]}
            order={[
              'scholarYear',
              'section',
              'sectionStudents',
              'sectionRepresentatives'
            ]}
            onClickRow={handleClick}
          />
        )}
      </div>
    </div>
  );
};

Students.displayName = 'Students';

export default Students;
