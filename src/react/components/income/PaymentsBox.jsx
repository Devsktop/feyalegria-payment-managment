import React from 'react';
import { useSelector } from 'react-redux';

// Comoponets
import PaymentsTrasference from './PaymentsTrasference';
import PaymentsCash from './PaymentsCash';
import PaymentsDolar from './PaymentsDolar';

const PaymentsBox = () => {
  return (
    <div>
      <PaymentsTrasference />
      <PaymentsCash />
      <PaymentsDolar />
    </div>
  );
};

export default PaymentsBox;
