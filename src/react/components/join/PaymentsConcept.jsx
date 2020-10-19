import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const PaymentConcept = ({ concept, price, id, handleConceptChange }) => {
  console.log('renderize ' + id);

  const handleName = e => {
    handleConceptChange({ id, concept: e.target.value, price });
  };
  const handleprice = e => {
    handleConceptChange({ id, concept, price: e.target.value });
  };

  return (
    <div>
      <input type="text" onChange={handleName} />
      <input type="text" onChange={handleprice} />
      <FontAwesomeIcon icon={faMinus} />
    </div>
  );
};

export default PaymentConcept;
