import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// Selectors
const representativeDataSelector = state => {
  const { names, lastNames, dni, phone } = state.income.representative;
  return { names, lastNames, dni, phone };
};

const RepresentativeData = () => {
  const { names, lastNames, dni, phone } = useSelector(
    representativeDataSelector,
    shallowEqual
  );

  const name = names.split(' ');
  const lastName = lastNames.split(' ');

  return (
    <div className="representativedata">
      <p>{`${name[0]} ${lastName[0]}`}</p>
      <p>{dni}</p>
      <p>{phone}</p>
    </div>
  );
};

export default RepresentativeData;
