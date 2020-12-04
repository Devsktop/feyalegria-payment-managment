import React from 'react';

// components
import Button from 'react/components/Button';

const JoinStudentsButton = () => {
  return (
    <div className="joinstudents_buttons">
      <Button link="/verifyRepresentative" text="Volver" />
      <Button link="/verifyRepresentative" text="Inscribir" />
    </div>
  );
};

export default JoinStudentsButton;
