import React, { useState } from 'react';

// Components
import PaymentsConcepts from './PaymentsConcepts';
import PaymentsConceptsController from './PaymentsConceptsController';

const AddPaymentConcepts = () => {
  const [concepts, setConcepts] = useState([]);

  const handleController = newConcepts => {
    setConcepts(newConcepts);
  };

  const handleRemove = id => {
    const newConcepts = concepts.filter(concept => concept !== id);
    setConcepts(newConcepts);
  };

  return (
    <div className="payment_concepts">
      <PaymentsConceptsController
        concepts={concepts}
        handleController={handleController}
      />
      <PaymentsConcepts concepts={concepts} handleRemove={handleRemove} />
    </div>
  );
};

export default AddPaymentConcepts;
