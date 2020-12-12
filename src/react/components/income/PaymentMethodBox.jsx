import React from 'react';
import { useSelector } from 'react-redux';

// Compontents
import PaymentMethod from './PaymentMethod';

// Selectors
const transferenceSelector = state => state.income.incomeBalance.transference;
const cashSelector = state => state.income.incomeBalance.cash;
const dolarSelector = state => state.income.incomeBalance.dolar;

const PaymentMethodBox = () => {
  const transference = useSelector(transferenceSelector);
  const cash = useSelector(cashSelector);
  const dolar = useSelector(dolarSelector);

  return (
    <div className="payment_method_box">
      <PaymentMethod
        checked={transference}
        method="Transferencia"
        action="transference"
      />
      <PaymentMethod checked={cash} method="Efectivo" action="cash" />
      <PaymentMethod checked={dolar} method="Dólar" action="dolar" />
    </div>
  );
};

export default PaymentMethodBox;
