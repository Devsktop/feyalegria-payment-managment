/* eslint-disable import/order */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Minput from 'react/components/Minput';
import PaymentInputBox from './PaymentInputBox';

// Actions
import { updateCash } from 'react/redux/actions/incomeActions';

// Helpers
import { intValidator } from 'helper';

const PaymentsCash = () => {
  const dispatch = useDispatch();

  const amount = useSelector(state => state.income.incomeBalance.cashAmount);

  const handleOnChangeAmount = e => {
    const amountValue = parseInt(intValidator(e, amount), 10) || '';
    dispatch(updateCash(amountValue));
  };
  return (
    <PaymentInputBox desc="Bolívares efectivo">
      <Minput
        label="Monto"
        type="text"
        onKeyDown={handleOnChangeAmount}
        value={amount}
        onChange={() => {}}
      />
    </PaymentInputBox>
  );
};

export default PaymentsCash;
