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
  const dolarTotal = parseFloat(
    ((transference + cash) / dolarPrice + dolar).toFixed(2)
  );

  return { bolivarTotal, dolarTotal };
};

const balanceSelector = state => {
  const { balance } = state.income.incomeBalance;
  const { dolar } = state.upperbar;

  return { dolarBalance: balance, bolivarBalance: balance * dolar };
};

const PaymenetsTotals = () => {
  const totals = useSelector(totalSelector);
  const balances = useSelector(balanceSelector);
  const finalBalanceDolar = totals.dolarTotal + balances.dolarBalance;
  const finalBalanceBolivar = totals.bolivarTotal + balances.bolivarBalance;
  return (
    <div className="payments_totals">
      <p>{`Total a pagar dólares: ${totals.dolarTotal}`}</p>
      <p>{`Total a pagar Bs.S: ${totals.bolivarTotal}`}</p>
      <p className={finalBalanceDolar >= 0 ? 'green' : 'red'}>
        {`Balance final dólares: 
      ${finalBalanceDolar.toFixed(2)}`}
      </p>
      <p className={finalBalanceBolivar >= 0 ? 'green' : 'red'}>
        {`Balance final Bs.S: 
      ${finalBalanceBolivar.toFixed(2)}`}
      </p>
    </div>
  );
};

export default PaymenetsTotals;
