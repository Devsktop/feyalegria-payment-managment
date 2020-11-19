import React from 'react';
import Button from 'react/components/Button';

const JoinStudentAddButton = () => {
  return (
    <div className="joinstudent_addbutton">
      <Button
        link={{
          pathname: '/addStudent',
          state: {
            prevPath: 'JoinStudent'
          }
        }}
        text="Añadir estudiante"
      />
    </div>
  );
};

export default JoinStudentAddButton;
