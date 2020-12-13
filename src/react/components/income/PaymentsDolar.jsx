/* eslint-disable import/order */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Minput from 'react/components/Minput';
import PaymentInputBox from './PaymentInputBox';

// Actions
import { updateDolar } from 'react/redux/actions/incomeActions';

// Helpers
import { intValidator } from 'helper';

const PaymentsDolar = () => {
  const dispatch = useDispatch();

  const amount = useSelector(state => state.income.incomeBalance.dolarAmount);

  const handleOnChangeAmount = e => {
    const amountValue = parseInt(intValidator(e, amount), 10) || '';
    dispatch(updateDolar(amountValue));
  };
  return (
    <PaymentInputBox desc="Dólares">
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

export default PaymentsDolar;
