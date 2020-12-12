/* eslint-disable import/order */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Minput from 'react/components/Minput';
import PaymentInputBox from './PaymentInputBox';

// Actions
import { updateTransference } from 'react/redux/actions/incomeActions';

// Helpers
import { intStringValidator } from 'helper';

const PaymentsTransference = () => {
  const dispatch = useDispatch();
  const reference = useSelector(
    state => state.income.incomeBalance.transferenceRef
  );
  const amount = useSelector(
    state => state.income.incomeBalance.transferenceAmount
  );

  const handleOnChangeRef = e => {
    const referenceValue = intStringValidator(e, reference);
    dispatch(updateTransference(0, referenceValue));
  };

  return (
    <PaymentInputBox desc="Transferencia bancaria">
      <Minput
        label="Referencia bancaria"
        type="text"
        onKeyDown={handleOnChangeRef}
        value={reference}
        onChange={() => {}}
      />
    </PaymentInputBox>
  );
};

export default PaymentsTransference;
