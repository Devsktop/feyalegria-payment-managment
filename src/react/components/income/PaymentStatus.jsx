import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// components
import PaymentStatusCalendar from '../Calendar';
import DetailsBox from '../DetailsBox';
import Button from '../Button';

// Actions 
import { resetRepresentative } from 'react/redux/actions/incomeActions';

const representativeSelector = state => {
  const { representative } = state.income.representative;
  const { dniTypeById } = state.income;

  return { ...representative, dniType: dniTypeById[representative.idDniType] };
};

const monthFunc = (id) => console.log(id);

const months = {
  1: {
    month: "SEPT",
    status: 1,
    onClick: monthFunc,
    id: 1
  },
  2: {
    month: "OCT",
    status: 1,
    onClick: monthFunc,
    id: 2
  },
  3: {
    month: "NOV",
    status: 3,
    onClick: monthFunc,
    id: 3
  },
  4: {
    month: "DIC",
    status: 2,
    onClick: monthFunc,
    id: 4
  },
  5: {
    month: "ENE",
    status: 2,
    onClick: monthFunc,
    id: 5
  },
  6: {
    month: "FEB",
    status: 2,
    onClick: monthFunc,
    id: 6
  },
  7: {
    month: "MAR",
    status: 2,
    onClick: monthFunc,
    id: 7
  },
  8: {
    month: "ABR",
    status: 2,
    onClick: monthFunc,
    id: 8
  },
  9: {
    month: "MAY",
    status: 2,
    onClick: monthFunc,
    id: 9
  },
  10: {
    month: "JUN",
    status: 2,
    onClick: monthFunc,
    id: 10
  },
  11: {
    month: "JUL",
    status: 2,
    onClick: monthFunc,
    id: 11
  },
  12: {
    month: "AGO",
    id: 12
  },

}

const onClickArrow = (arrow) => {
  console.log(arrow);
}

const total = 500000000;
const cancelado = 200;

const details = [
  {
    title: "Total a cancelar",
    data: [`Total a pagar: ${total}`, `Total cancelado: ${cancelado}`, `Restante: ${total - cancelado}`]
  },
  {
    title: "Total a cancelar",
    data: [`Total a pagar: ${total}`, `Total cancelado: ${cancelado}`, `Restante: ${total - cancelado}`]
  },
  {
    title: "Total a cancelar",
    data: [`Total a pagar: ${total}`, `Total cancelado: ${cancelado}`, `Restante: ${total - cancelado}`]
  }
]

const PaymentStatus = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const balance = useSelector(state => state.income.representative.balance);

  const handleGoBack = () => {
    history.push('/verifyRepresentative');
    dispatch(resetRepresentative());
  }

  return (
    <div className="box payment_status_box">
      <div >
        <h1 className={balance >= 0 ? 'green' : 'red'} >Balance: {balance}$</h1>
        <div className="status_box">
          <PaymentStatusCalendar months={months} balance={8} dolar={50} title="Estatus de pago 2021" onClickArrow={onClickArrow} />
          <DetailsBox details={details} />
        </div>
        <div className="button_container">
          <Button text="Volver" onClick={handleGoBack} />
          <Button
            link={{
              pathname: '/JoinStudents',
              state: {
                prevPath: 'PaymentStatus'
              }
            }}
            text="Inscribir"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
