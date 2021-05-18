import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

// Actions
import { updateBalance } from 'react/redux/actions/incomeActions';

const inscriptionPriceSelector = state => {
  const { rates } = state;
  let price = 0;

  Object.keys(rates).forEach(rateKey => {
    if (rates[rateKey].type === 'INSCRIPTION') {
      price += rates[rateKey].price;
      Object.keys(rates[rateKey].paymentConcepts).forEach(conceptKey => {
        price += rates[rateKey].paymentConcepts[conceptKey].conceptPrice;
      });
    }
  });

  return price;
};

const monthlyDebtSelector = state => {
  const { rates } = state;
  const { currentMonth } = state.globals;

  let price = 0;

  Object.keys(rates).forEach(rateKey => {
    if (rates[rateKey].type === 'MONTHLYPAYMENT') {
      price += rates[rateKey].price;
      Object.keys(rates[rateKey].paymentConcepts).forEach(conceptKey => {
        price += rates[rateKey].paymentConcepts[conceptKey].conceptPrice;
      });
    }
  });

  return price * currentMonth;
};

const representativeBalanceSelector = state => {
  return state.income.representative.balance;
};

const checkedStudentsSelector = state => {
  const { students } = state.income.representative;
  let checkedStudents = 0;
  Object.keys(students).forEach(studentKey => {
    if (students[studentKey].willJoin) checkedStudents += 1;
  });
  return checkedStudents;
};

const totalInscriptionSelector = createSelector(
  inscriptionPriceSelector,
  checkedStudentsSelector,
  (inscriptionPrice, checkedStudents) => inscriptionPrice * checkedStudents
);

const totalMonthlySelector = createSelector(
  monthlyDebtSelector,
  checkedStudentsSelector,
  (monthlyDebt, checkedStudents) => monthlyDebt * checkedStudents
);

const totalProductsSelector = (state) => {
  const { products } = state.income;
  let totalProducts = 0;
  Object.keys(products).forEach(productKey => {
    const { amount, price } = products[productKey];
    totalProducts += amount * price;
  });
  return totalProducts;
}

const dolarPriceSelector = state => {
  const { dolar } = state.upperbar;
  return dolar;
};

const IncomeTotals = () => {
  const dispatch = useDispatch();
  const inscriptionPrice = useSelector(totalInscriptionSelector);
  const monthlyDebt = useSelector(totalMonthlySelector);
  const representativeBalance = useSelector(representativeBalanceSelector);
  const dolarPrice = useSelector(dolarPriceSelector);
  const totalProducts = useSelector(totalProductsSelector);
  const totalBalance = representativeBalance - (inscriptionPrice + monthlyDebt + totalProducts);

  useEffect(() => {
    dispatch(updateBalance(totalBalance));
  }, [totalBalance]);

  return (
    <div className="income_totals">
      <p>{`Total inscripciones: ${inscriptionPrice}$`}</p>
      <p>{`Mensualidades pendientes: ${monthlyDebt}$`}</p>
      <p>{`Total productos: ${totalProducts}$`}</p>
      <p
        className={representativeBalance < 0 ? 'balance_red' : 'balance_green'}
      >
        {`Balance actual: ${representativeBalance}$`}
      </p>
      <p className={totalBalance < 0 ? 'balance_red' : 'balance_green'}>
        {totalBalance < 0 ? 'Saldo deudor: ' : 'Saldo acreedor: '}
        {`${Math.abs(totalBalance)}$`}
      </p>
      <p className={totalBalance < 0 ? 'balance_red' : 'balance_green'}>
        {totalBalance < 0 ? 'Saldo deudor: ' : 'Saldo acreedor: '}
        {`${Math.abs(totalBalance) * dolarPrice} Bs.S`}
      </p>
    </div>
  );
};

export default IncomeTotals;
