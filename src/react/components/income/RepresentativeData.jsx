import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// Selectors
const representativeDataSelector = state => {
  const {
    dni,
    idDniType,
    names,
    lastNames,
    phone
  } = state.income.representative;
  const { dniTypeById } = state.income;
  return {
    dni,
    dniType: dniTypeById[idDniType],
    names,
    lastNames,
    phone
  };
};

const RepresentativeData = () => {
  const { names, lastNames, dni, phone, dniType } = useSelector(
    representativeDataSelector,
    shallowEqual
  );

  const name = names.split(' ');
  const lastName = lastNames.split(' ');

  return (
    <div className="representativedata">
      <p>{`${name[0]} ${lastName[0]}`}</p>
      <p>{`${dniType}-${dni}`}</p>
      <p>{phone}</p>
    </div>
  );
};

export default RepresentativeData;
