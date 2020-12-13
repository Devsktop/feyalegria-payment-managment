import React from 'react';
import { useSelector } from 'react-redux';

const totalSelector = state => {
  let {
    transferenceAmount: transference,
    cashAmount: cash,
    dolarAmount: dolar
  } = state.income.incomeBalance;
  const { dolar: dolarPrice } = state.upperbar;

  const {
    transference: transferenceChecked,
    cash: cashChecked,
    dolar: dolarChecked
  } = state.income.incomeBalance;

  transference = transferenceChecked ? transference : 0;
  cash = cashChecked ? cash : 0;
  dolar = dolarChecked ? dolar : 0;

  const bolivarTotal = transference + cash + dolar * dolarPrice;
  const dolarTotal = (transference + cash) / dolarPrice + dolar;

  return { bolivarTotal, dolarTotal };
};

const PaymenetsTotals = () => {
  const totals = useSelector(totalSelector);
  return (
    <div className="payments_totals">
      <p>
        Total a pagar dólares:
        {totals.dolarTotal}
      </p>
      <p>
        Total a pagar Bs.S:
        {totals.bolivarTotal}
      </p>
    </div>
  );
};

export default PaymenetsTotals;
