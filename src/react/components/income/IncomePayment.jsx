import React from 'react';

// Components
import PaymentMethodBox from './PaymentMethodBox';
import PaymentsBox from './PaymentsBox';

const IncomePayment = () => {
  return (
    <div className="incomepayment">
      <h1 className="incomepayment_title">Pago de inscripción</h1>
      <h2 className="incomepayment_subtitle">Ingrese los datos del pago</h2>
      <PaymentMethodBox />
      <PaymentsBox />
    </div>
  );
};

export default IncomePayment;
