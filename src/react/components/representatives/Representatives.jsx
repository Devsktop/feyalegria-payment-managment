import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const gradesSelector = state => state.grades.grades;

const Representatives = () => {
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

  const sectiosnByGrade = [];

  const gradesData = [];

  Object.keys(grades).forEach(gradeKey => {
    const {
      scholarYear,
      gradesSections,
      gradeStudents,
      gradeRepresentative
    } = grades[gradeKey];
    Object.keys(gradesSections).forEach(sectionKey => {
      sectiosnByGrade.push({
        id: sectionKey,
        scholarYear,
        gradeStudents,
        gradeRepresentative
      });
    });
    gradesData.push({ ...grades[gradeKey], id: grades[gradeKey].idGrade });
  });

  const handleClick = id => history.push(`/representativeByGrade/${id}`);

  return (
    <div className="content-screen">
      <div className="box representatives_box">
        <h1 className="box_title">Representantes</h1>
        <h2 className="box_subtitle">Seleccionar un Año escolar</h2>
        {isEmpty ? (
          <h2 className="box_subtitle">No hay grados registrados</h2>
        ) : (
          <DataTable
            className="table"
            data={gradesData}
            properties={[
              'Año Escolar',
              'Sección',
              'No. Representantes',
              'No. Estudiantes'
            ]}
            order={[
              'scholarYear',
              'sectionsNumber',
              'gradeStudents',
              'gradeRepresentatives'
            ]}
            onClickRow={handleClick}
          />
        )}
      </div>
    </div>
  );
};

Representatives.displayName = 'Representatives';

export default Representatives;
