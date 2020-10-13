import React from 'react';
import { useSelector } from 'react-redux';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

// Components
import DataBox from './DataBox';

// Selectors
const studentSelector = state => state.students;

const DataBoxContainer = () => {
  const students = useSelector(studentSelector);

  return (
    <>
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data={students.joinedStudents}
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos Solventes"
        data={students.solventStudents}
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos insolventes"
        data={students.insolventStudents}
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data="60"
        link="/register"
      />
    </>
  );
};

export default DataBoxContainer;
