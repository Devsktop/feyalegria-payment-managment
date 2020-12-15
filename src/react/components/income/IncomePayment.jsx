import React from 'react';

// Components
import PaymentMethodBox from './PaymentMethodBox';
import PaymentsBox from './PaymentsBox';
import PaymentsTotals from './PaymentsTotals';
import PaymentsButtons from './PaymentsButtons';

const IncomePayment = () => {
  return (
    <div className="incomepayment">
      <h1 className="incomepayment_title">Pago de inscripción</h1>
      <h2 className="incomepayment_subtitle">Ingrese los datos del pago</h2>
      <PaymentMethodBox />
      <PaymentsBox />
      <div className="payments_bottom">
        <PaymentsTotals />
        <PaymentsButtons />
      </div>
    </div>
  );
};

export default IncomePayment;
