import React from 'react';

// Components
import RepresentativeData from './RepresentativeData';
import JoinStudents from './JoinStudents';

const JoinStudentsBox = () => {
  return (
    <div className="box joinstudent_box">
      <RepresentativeData />
      <JoinStudents />
    </div>
  );
};

export default JoinStudentsBox;
