import React from 'react';
import { useSelector } from 'react-redux';
import { faUsers, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

// Components
import DataBox from './DataBox';

// Selectors
const studentSelector = state => state.students;
const paymentSelector = state => {
  const {
    today: { total: today },
    month: { total: month },
    advancements: { total: advancements },
    arrears: { totalArrear: arrears }
  } = state.payments;

  return { today, month, arrears, advancements };
};

const DataBoxContainer = () => {
  const students = useSelector(studentSelector);
  const payments = useSelector(paymentSelector);

  return (
    <>
      <DataBox
        icon={faUsers}
        desc="Alumnos inscritos"
        data={students.joinedStudents}
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos Solventes"
        data={students.solventStudents}
        link="/register"
      />
      <DataBox
        icon={faUsers}
        desc="Alumnos insolventes"
        data={students.insolventStudents}
        link="/register"
      />
      <DataBox
        icon={faMoneyBill}
        desc="Ingresos del día"
        data={payments.today}
        link="/register"
      />
      <DataBox
        icon={faMoneyBill}
        desc="Ingresos del mes"
        data={payments.month}
        link="/register"
      />
      <DataBox
        icon={faMoneyBill}
        desc="Pagos adelantados"
        data={payments.advancements}
        link="/register"
      />
      <DataBox
        icon={faMoneyBill}
        desc="Pagos atrasados"
        data={payments.arrears}
        link="/register"
      />
    </>
  );
};

export default DataBoxContainer;
