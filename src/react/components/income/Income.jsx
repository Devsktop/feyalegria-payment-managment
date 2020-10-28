import React from 'react';

// Components
import IncomeBox from './IncomeBox';

// Import imgs

const Income = () => {
  return (
    <div className="config content-screen">
      <IncomeBox
        ilustration={'JoinIlustration'}
        title="Incribir Alumnos"
        link="/grades"
      />
      <IncomeBox
        ilustration={'MonthlyPaymentsIlustration'}
        title="Pagar Mensualidades"
        link="/join"
      />
      <IncomeBox
        ilustration={'ProductsIlustration'}
        title="Pagar Productos"
        link="/monthlyPayments"
      />
    </div>
  );
};

export default Income;
