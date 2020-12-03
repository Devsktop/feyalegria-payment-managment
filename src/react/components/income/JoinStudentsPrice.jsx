import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

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

const JoinStudentsPrice = () => {
  const inscriptionPrice = useSelector(totalInscriptionSelector);
  const monthlyDebt = useSelector(totalMonthlySelector);
  const representativeBalance = useSelector(representativeBalanceSelector);

  return (
    <div className="joinstudents_price">
      <p>
        Total inscripciones:
        {inscriptionPrice}
      </p>
      <p>
        Mensualidades pendientes:
        {monthlyDebt}
      </p>
      <p>
        Balance actual:
        {representativeBalance}
      </p>
      <p>
        Total a pagar:
        {inscriptionPrice + monthlyDebt - representativeBalance}
      </p>
    </div>
  );
};

export default JoinStudentsPrice;
