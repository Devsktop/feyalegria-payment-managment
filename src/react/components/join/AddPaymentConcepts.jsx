import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Components
import PaymentsConceptsBox from './PaymentsConceptsBox';

const AddPaymentConcepts = ({
  action,
  boxSelector,
  conceptSelector,
  addAction,
  removeAction
}) => {
  const dispatch = useDispatch();
  const [lastId, setLastId] = useState(-1);

  const handleController = () => {
    const newConcept = {
      idConcept: lastId,
      concept: '',
      price: 0
    };
    setLastId(id => id - 1);
    dispatch(addAction(newConcept));
  };

  return (
    <div className="payment_concepts">
      <div className="payment_concepts_controller">
        <p>Añadir concepto de pago</p>
        <FontAwesomeIcon icon={faPlus} onClick={handleController} />
      </div>
      <PaymentsConceptsBox
        boxSelector={boxSelector}
        conceptSelector={conceptSelector}
        action={action}
        removeAction={removeAction}
      />
    </div>
  );
};

AddPaymentConcepts.propTypes = {
  action: PropTypes.func.isRequired,
  addAction: PropTypes.func.isRequired,
  boxSelector: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired,
  conceptSelector: PropTypes.func.isRequired
};

export default AddPaymentConcepts;
