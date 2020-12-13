import React from 'react';
import { useSelector } from 'react-redux';

// Comoponets
import PaymentsTrasference from './PaymentsTrasference';
import PaymentsCash from './PaymentsCash';
import PaymentsDolar from './PaymentsDolar';

const showPaymentsSelector = state => {
  const { transference, dolar, cash } = state.income.incomeBalance;
  return { transference, dolar, cash };
};

const PaymentsBox = () => {
  const showPayments = useSelector(showPaymentsSelector);
  return (
    <div className="payments_box">
      {showPayments.transference && <PaymentsTrasference />}
      {showPayments.cash && <PaymentsCash />}
      {showPayments.dolar && <PaymentsDolar />}
    </div>
  );
};

export default PaymentsBox;
