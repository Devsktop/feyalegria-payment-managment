import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const PaymentsConcepts = ({ handleController, concepts }) => {
  const handleOnClick = () => {
    if (concepts.length === 0) return handleController([0]);

    const lastController = concepts[concepts.length - 1];
    const newConcepts = [...concepts, lastController + 1];
    handleController(newConcepts);
  };

  return (
    <div className="payment_concepts_controller">
      <p>Añadir concepto de pago</p>
      <FontAwesomeIcon icon={faPlus} onClick={handleOnClick} />
    </div>
  );
};

PaymentsConcepts.propTypes = {
  concepts: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleController: PropTypes.func.isRequired
};

export default React.memo(PaymentsConcepts);
