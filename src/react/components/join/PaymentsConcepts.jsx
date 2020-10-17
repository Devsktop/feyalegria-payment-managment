import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const PaymentsConcepts = ({ concepts, handleRemove }) => {
  return (
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
  );
};

PaymentsConcepts.propTypes = {
  concepts: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default PaymentsConcepts;
