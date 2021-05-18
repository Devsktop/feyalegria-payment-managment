import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// components
import Button from 'react/components/Button';

// Actions
import { resetRepresentative } from 'react/redux/actions/incomeActions';

const studentsValidSelector = state => {
  const { students } = state.income.representative;
  let disabled = true;
  Object.keys(students).forEach(studentKey => {
    if (students[studentKey].willJoin) disabled = false;
  });
  return disabled;
};


const productsCountSelector = (state) => {
  const { products } = state.products;
  return Object.keys(products).length;
}

const JoinStudentsButton = () => {
  const dispatch = useDispatch();
  const studentValid = useSelector(studentsValidSelector);
  const history = useHistory();
  const productsCount = useSelector(productsCountSelector);

  const handleOnClick = () => {
    if (productsCount > 0) history.push("/purchaseProducts");
    else history.push("/incomePayment");
  }

  const handleGoBack = () => {
    if (history.location.state && history.location.state.prevPath === 'PaymentStatus') {
      history.push('/paymentStatus');
    } else {
      dispatch(resetRepresentative());
      history.push('/verifyRepresentative');
    }
  };

  return (
    <div className="joinstudents_buttons">
      <Button onClick={handleGoBack} text="Volver" />
      <Button
        onClick={handleOnClick}
        text="Continuar"
        disabled={studentValid}
      />
    </div>
  );
};

export default JoinStudentsButton;
