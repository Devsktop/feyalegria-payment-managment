import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// components
import Button from 'react/components/Button';

const disableButtonSelector = (state) => {
  const { transference, transferenceAmount, transferenceRef, cash, cashAmount, dolar, dolarAmount } = state.income.incomeBalance;
  let disable = false;
  if (transference && (transferenceRef === "" || transferenceAmount < 1)) disable = true;
  if (cash && cashAmount < 1) disable = true;
  if (dolar && dolarAmount < 1) disable = true;
  return disable;
}

const productsCountSelector = (state) => {
  const { products } = state.products;
  return Object.keys(products).length;
}

const JoinStudentsButton = () => {
  const history = useHistory();
  const disable = useSelector(disableButtonSelector);
  const productsCount = useSelector(productsCountSelector);

  const handleOnClick = () => {
    if (productsCount > 0) history.push("/purchaseProducts");
    else history.push("/paymentResume");
  }
  return (
    <div className="payments_buttons">
      <Button text="Volver" onClick={() => history.goBack()} />
      <Button onClick={handleOnClick} text="Inscribir" disabled={disable} />
    </div>
  );
};

export default JoinStudentsButton;
