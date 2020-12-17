import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const representativeSelector = state => {
  const { representative } = state.income.representative;
  const { dniTypeById } = state.income;

  return { ...representative, dniType: dniTypeById[representative.idDniType] };
};

const PaymentStatus = () => {
  const representative = useSelector(representativeSelector);
  return (
    <div>
      <h1>
        {`
      ${representative.names.split(' ')[0]} 
      ${representative.lastNames.split(' ')[0]}
      `}
      </h1>
      <p className="subtitle">{`${representative.dniType} ${representative.dni}`}</p>
      <p>{`Inscripción pendiente: ${representative.inscriptionPending}`}</p>
    </div>
  );
};

export default PaymentStatus;
