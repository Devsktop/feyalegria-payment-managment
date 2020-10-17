import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const PaymentConcepts = () => {
  const [concepts, setConcepts] = useState([]);

  const handleController = () => {
    if (concepts.length === 0) return setConcepts([0]);

    const lastController = concepts[concepts.length - 1];
    const newConcepts = [...concepts, lastController + 1];
    setConcepts(newConcepts);
  };

  const handleRemove = id => {
    const newConcepts = concepts.filter(concept => concept !== id);
    setConcepts(newConcepts);
  };

  return (
    <div className="payment_concepts">
      <div className="payment_concepts_controller">
        <p>Añadir concepto de pago</p>
        <FontAwesomeIcon icon={faPlus} onClick={handleController} />
        <div className="payment_concepts_box">
          {concepts.map(concept => {
            return (
              <div key={concept} className="payment_concepts_box_concept">
                <p>{concept}</p>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => handleRemove(concept)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentConcepts;
