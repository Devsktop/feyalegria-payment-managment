import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';

// Actions
import { fetchStudents } from 'react/redux/actions/studentsActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const studentsSelector = state => state.students.students;

const StudentsByGrade = () => {
  // States
  const [pag, setPag] = useState(0);
  // Link Params
  const { id } = useParams();
  // Link Query
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const grade = query.get('scholarYear');
  const section = query.get('section');
  // Dispatch
  const dispatch = useDispatch();
  // useSelectors
  const students = useSelector(studentsSelector);
  const isFetching = useSelector(state => state.students.isFetching);
  // useHistory
  const history = useHistory();

  let isEmpty = false;
  const studentsData = [];

  useEffect(() => {
    dispatch(fetchStudents(id, pag));
  }, [pag, id]);

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (Object.keys(students).length === 0) {
    isEmpty = true;
  }

  Object.keys(students).forEach(studentKey => {
    const { names, lastNames } = students[studentKey];
    // Split to names & lastNames
    const name = names.split(' ');
    const lastName = lastNames.split(' ');
    // Array Destructuring
    const [shortName] = name;
    const [shortLastName] = lastName;
    // Equalize shortName & shortLastName in students's name & lastNames properties
    students[studentKey].names = shortName;
    students[studentKey].lastNames = shortLastName;
    // Convert students object to an array for DataTable
    studentsData[studentKey] = {
      ...students[studentKey],
      id: students[studentKey].idStudent
    };
  });

  const handleClick = idRepresentative =>
    history.push(`/representativeProfile/${idRepresentative}`);

  return (
    <div className="content-screen">
      <div className="box representatives_box_big">
        <h1 className="box_title">{`Estudiantes de ${grade} ${section}`}</h1>
        <h2 className="box_subtitle">Seleccione un estudiante</h2>
        {isEmpty ? (
          <h2 className="box_subtitle">No hay estudiantes registrados</h2>
        ) : (
          <DataTable
            className="table"
            data={studentsData}
            properties={[
              'Nombre',
              'Apellido',
              'Cédula',
              'Fecha Nac',
              'Representante',
              'Saldo $'
            ]}
            order={[
              'names',
              'lastNames',
              'dni',
              'birthDate',
              'representative',
              'balance'
            ]}
            onClickRow={handleClick}
          />
        )}
      </div>
    </div>
  );
};

StudentsByGrade.displayName = 'StudentsByGrade';

export default StudentsByGrade;
