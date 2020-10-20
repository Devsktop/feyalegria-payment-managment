import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import PaymentsConcept from './PaymentsConcept';

const PaymentsConceptsBox = ({
  action,
  boxSelector,
  conceptSelector,
  removeAction
}) => {
  const concepts = useSelector(boxSelector);
  console.log(concepts);
  return (
    <div className="payment_concepts_box">
      {Object.keys(concepts).map(key => (
        <PaymentsConcept
          key={key}
          action={action}
          removeAction={removeAction}
          conceptSelector={conceptSelector}
          id={key}
        />
      ))}
    </div>
  );
};

PaymentsConceptsBox.propTypes = {
  action: PropTypes.func.isRequired,
  boxSelector: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired,
  conceptSelector: PropTypes.func.isRequired
};

export default PaymentsConceptsBox;
