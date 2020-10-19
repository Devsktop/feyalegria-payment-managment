import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Components
import PaymentsConceptsBox from './PaymentsConceptsBox';

const AddPaymentConcepts = () => {
  const [concepts, setConcepts] = useState([]);
  const [lastId, setLastId] = useState(0);

  const handleController = () => {
    const newConcept = {
      id: lastId,
      concept: '',
      price: 0
    };
    setLastId(id => id + 1);
    setConcepts([...concepts, newConcept]);
  };

  const handleRemove = id => {
    const newConcepts = concepts.filter(concept => concept.id !== id);
    setConcepts(newConcepts);
  };

  const handleConceptChange = changedConcept => {
    const newConcepts = concepts.map(concept => {
      if (changedConcept.id === concept.id) return changedConcept;
      return concept;
    });
    setConcepts(newConcepts);
  };

  return (
    <div className="payment_concepts">
      <div className="payment_concepts_controller">
        <p>Añadir concepto de pago</p>
        <FontAwesomeIcon icon={faPlus} onClick={handleController} />
      </div>
      <PaymentsConceptsBox
        concepts={concepts}
        handleRemove={handleRemove}
        handleConceptChange={handleConceptChange}
      />
    </div>
  );
};

export default AddPaymentConcepts;
