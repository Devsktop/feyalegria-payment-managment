/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { togglePaymentMethod } from 'react/redux/actions/incomeActions';

const PaymentMethod = ({ method, checked, action }) => {
  const dispatch = useDispatch();
  const handleCheck = () => dispatch(togglePaymentMethod(action));

  return (
    <div
      className={`payment_method ${checked ? 'checked' : ''}`}
      onClick={handleCheck}
    >
      <input type="checkbox" checked={checked} onChange={() => {}} />
      <span className="checkmark" />
      {method}
    </div>
  );
};

PaymentMethod.propTypes = {
  method: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired
};

export default PaymentMethod;
