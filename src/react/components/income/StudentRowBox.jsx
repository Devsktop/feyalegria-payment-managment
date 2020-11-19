import React from 'react';
import { useSelector } from 'react-redux';

import StudentRow from './StudentRow';

const StudentRowBox = () => {
  const students = useSelector(state => state.income.representative.students);
  return (
    <div className="studentrow_box">
      {Object.keys(students).map(StudentKey => {
        return <StudentRow key={StudentKey} student={students[StudentKey]} />;
      })}
    </div>
  );
};

export default StudentRowBox;
