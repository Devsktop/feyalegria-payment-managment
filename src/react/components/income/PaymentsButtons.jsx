import React from 'react';
import { useHistory } from 'react-router';

// components
import Button from 'react/components/Button';

const JoinStudentsButton = () => {
  const history = useHistory();
  return (
    <div className="payments_buttons">
      <Button text="Volver" onClick={() => history.goBack()} />
      <Button link="/purchaseProducts" text="Inscribir" />
    </div>
  );
};

export default JoinStudentsButton;
