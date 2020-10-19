import React from 'react';
import PropTypes from 'prop-types';

// Components
import PaymentsConcept from './PaymentsConcept';

const PaymentsConceptsBox = ({
  concepts,
  handleRemove,
  handleConceptChange
}) => {
  return (
    <div className="payment_concepts_box">
      {concepts.map(({ id, concept, price }) => (
        <PaymentsConcept
          key={id}
          id={id}
          concept={concept}
          price={price}
          handleConceptChange={handleConceptChange}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

PaymentsConceptsBox.propTypes = {
  concepts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      concept: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleConceptChange: PropTypes.func.isRequired
};

export default PaymentsConceptsBox;
