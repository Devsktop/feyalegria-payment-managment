import React from 'react';
import PropTypes from 'prop-types';

const PaymentInputBox = ({ desc, children }) => {
  return (
    <div className="payment_input_box">
      <span>{desc}</span>
      {children}
    </div>
  );
};

PaymentInputBox.propTypes = {
  desc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default PaymentInputBox;
