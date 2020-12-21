import React from 'react';
import { useSelector } from 'react-redux';

import CalendarMonth from 'react/components/CalendarMonth';

const monthlyStatusSelector = state => {
  const { monthlyBalance } = state.income.incomeBalance;
  const { paidMonths } = state.income.representative;
  const { currentMonth } = state.globals;
};

const PaymentStatusCalendar = () => {
  return <div className="calendar"></div>;
};

export default PaymentStatusCalendar;


