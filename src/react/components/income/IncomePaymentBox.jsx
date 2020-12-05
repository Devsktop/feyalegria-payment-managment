import React from 'react';
import RepresentativeData from './RepresentativeData';
import IncomePayment from './IncomePayment';

const IncomePaymentBox = () => {
  return (
    <div className="box incomepayment_box">
      <RepresentativeData />
      <IncomePayment />
    </div>
  );
};

export default IncomePaymentBox;
