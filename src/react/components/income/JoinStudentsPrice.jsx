import React from 'react';
import { useSelector } from 'react-redux';

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

const monthlyDebt = state => {
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

const countStudentsSelector = state => {
  const { students } = state.income.representative;
  return Object.keys(students).length;
};

const JoinStudentsPrice = () => {
  return (
    <div className="joinstudents_price">
      <p>Total inscripciones:</p>
      <p>Mensualidades pendientes:</p>
      <p>Balance actual:</p>
      <p>Total a pagar:</p>
    </div>
  );
};

export default JoinStudentsPrice;
