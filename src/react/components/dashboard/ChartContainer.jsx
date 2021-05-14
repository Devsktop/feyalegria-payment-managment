import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Components
import CircleChart from './CircleChart';

// Selectors

// STUDENTS SELECTORS
const studentSelector = state => {
  const { solventStudents, joinedStudents } = state.students;
  const percent = parseInt((solventStudents / joinedStudents) * 100, 10) || 0;
  return { solventStudents, joinedStudents, percent };
};

// MONTHPAYMENT SELECTORS
const monthPriceSelector = state => {
  const { rates } = state;
  const ratesKeys = Object.keys(state.rates);
  let monthlyPrice = 0;

  ratesKeys.some(rateKey => {
    if (rates[rateKey].type === 'MONTHLYPAYMENTS') {
      monthlyPrice = rates[rateKey].price;
      return true;
    }
    return false;
  });

  return monthlyPrice;
};

const joinedStudentsSelector = state => state.students.joinedStudents || 0;

const monthIncomeSelector = state => state.payments.month.total || 0;

const monthPaymentsSelector = createSelector(
  monthPriceSelector,
  joinedStudentsSelector,
  monthIncomeSelector,
  (monthPrice, joinedStudents, monthIncome) => {
    const monthTotal = monthPrice * joinedStudents;
    const percent = parseInt((monthIncome / monthTotal) * 100, 10) || 0;
    return { monthTotal, monthIncome, percent };
  }
);

// DOLAR SELECTORS
const dolarCashSelector = state => {
  const { dolar } = state.payments.month;
  let dolarAmount = 0;
  if (dolar) {
    dolar.forEach(({ amount }) => {
      dolarAmount += amount;
    });
  }

  return dolarAmount;
};

const dolarSelector = createSelector(
  dolarCashSelector,
  monthIncomeSelector,
  (cash, monthIncome) => {
    const percent = parseInt((cash / monthIncome) * 100, 10) || 0;
    return { percent, cash, monthIncome };
  }
);

const ChartContainer = () => {
  const students = useSelector(studentSelector);
  const monthPayment = useSelector(monthPaymentsSelector);
  const dolar = useSelector(dolarSelector);

  return (
    <div className="chart_container">
      <CircleChart
        desc="Alumnos solventes"
        percent={students.percent}
        text={`${students.percent}%`}
        total={`${students.solventStudents}/${students.joinedStudents}`}
      />
      <CircleChart
        desc="Pagos del mes"
        percent={monthPayment.percent}
        text={`${monthPayment.percent}%`}
        total={`${monthPayment.monthIncome}/${monthPayment.monthTotal}`}
      />
      <CircleChart
        desc="Dólares en efectivo"
        percent={dolar.percent}
        text={`${dolar.percent}%`}
        total={`${dolar.cash}/${dolar.monthIncome}`}
      />
    </div>
  );
};

export default ChartContainer;
