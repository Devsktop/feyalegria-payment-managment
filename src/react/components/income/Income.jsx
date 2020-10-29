import React from 'react';

// Components
import IncomeBox from './IncomeBox';

// Import imgs
import JoinIlustration from './JoinIlustration.svg';
import MonthlyPaymentsIlustration from './MonthlyPaymentsIlustration.svg';
import ProductsIlustration from './ProductsIlustration.svg';

const Income = () => {
  return (
    <div className="config content-screen">
      <IncomeBox
        ilustration={JoinIlustration}
        title="Inscribir Alumnos"
        link="/grades"
      />
      <IncomeBox
        ilustration={MonthlyPaymentsIlustration}
        title="Pagar Mensualidades"
        link="/join"
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
