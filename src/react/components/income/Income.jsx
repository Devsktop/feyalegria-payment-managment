import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { setIncome, resetIncome } from 'react/redux/actions/incomeActions';

// Components
import IncomeBox from './IncomeBox';

// Import imgs
import JoinIlustration from './JoinIlustration.svg';
import MonthlyPaymentsIlustration from './MonthlyPaymentsIlustration.svg';
import ProductsIlustration from './ProductsIlustration.svg';

const Income = () => {
  useEffect(() => {
    dispatch(resetIncome());
  }, []);

  const dispatch = useDispatch();
  return (
    <div className="config content-screen">
      <IncomeBox
        ilustration={JoinIlustration}
        title="Inscribir Alumnos"
        link="/verifyRepresentative"
        onClick={() => dispatch(setIncome('INSCRIPTION'))}
      />
      <IncomeBox
        ilustration={MonthlyPaymentsIlustration}
        title="Pagar Mensualidades"
        link="/verifyRepresentative"
        onClick={() => dispatch(setIncome('MONTHLYPAYMENT'))}
      />
      <IncomeBox
        ilustration={ProductsIlustration}
        title="Pagar Productos"
        link="/monthlyPayments"
      />
    </div>
  );
};

export default Income;
