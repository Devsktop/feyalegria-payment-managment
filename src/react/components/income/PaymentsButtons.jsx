import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// components
import Button from 'react/components/Button';

const disableButtonSelector = (state) => {
  const { transference, transferenceAmount, transferenceRef, cash, cashAmount, dolar, dolarAmount } = state.income.incomeBalance;
  let disable = false;
  if (transference && transferenceRef === "" || transferenceAmount < 1) disable = true;
  if (cash && cashAmount < 1) disable = true;
  if (dolar && dolarAmount < 1) disable = true;
  return disable;
}

const JoinStudentsButton = () => {
  const history = useHistory();
  const disable = useSelector(disableButtonSelector);

  const handleOnClick = () => {
    history.push("/purchaseProducts")
  }
  return (
    <div className="payments_buttons">
      <Button text="Volver" onClick={() => history.goBack()} />
      <Button onClick={handleOnClick} text="Inscribir" disabled={disable} />
    </div>
  );
};

export default JoinStudentsButton;
