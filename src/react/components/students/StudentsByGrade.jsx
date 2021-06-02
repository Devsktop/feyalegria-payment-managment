import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';

// Actions
import { fetchStudentsBySection } from 'react/redux/actions/studentsActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const studentsSelector = state => state.students.studentsBySection;

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
    dispatch(fetchStudentsBySection(id, pag));
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

  if (Object.keys(students).length > 0) {
    Object.keys(students).forEach(studentKey => {
      const { names, lastNames, representative, bornDate } = students[
        studentKey
      ];
      // Split to names & lastNames
      const name = names.split(' ');
      const lastName = lastNames.split(' ');
      const representativeFullName = representative.split(' ');
      // Array Destructuring
      const [shortName] = name;
      const [shortLastName] = lastName;
      const finalName = `${shortName} ${shortLastName}`;
      const representativeName = `${representativeFullName[0]} ${representativeFullName[2]}`;
      // Date
      const date = new Date(bornDate);
      const day = `${`0${date.getDate()}`.slice(-2)}`;
      const month = `${`0${date.getMonth() + 1}`.slice(-2)}`;
      const year = date.getFullYear();
      const finalDate = `${day}-${month}-${year}`;

      // Equalize shortName & shortLastName in students's name & lastNames properties
      students[studentKey].names = finalName;
      students[studentKey].representative = representativeName;
      students[studentKey].bornDate = finalDate;
      // Convert students object to an array for DataTable
      studentsData[studentKey] = {
        ...students[studentKey],
        id: students[studentKey].idStudent
      };
    });
  }

  const handleClick = idStudent => history.push(`/studentProfile/${idStudent}`);

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
              'Nombre y apellido',
              'Cédula',
              'Fecha de nacimiento',
              'Representante',
              'Saldo $'
            ]}
            order={['names', 'dni', 'bornDate', 'representative', 'balance']}
            onClickRow={handleClick}
          />
        )}
      </div>
    </div>
  );
};

StudentsByGrade.displayName = 'StudentsByGrade';

export default StudentsByGrade;
