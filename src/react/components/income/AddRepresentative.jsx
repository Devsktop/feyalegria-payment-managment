import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { updateRepresentative } from 'react/redux/actions/incomeActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

// Import imgs
import AddRepresentativeIlustration from './AddRepresentativeIlustration.svg';

const representativeDniSelector = state => {
  const { dni, idDniType } = state.income.representative;
  const { dniTypeById } = state.income;
  return { dni, dniType: dniTypeById[idDniType] };
};

const AddRepresentative = () => {
  const { dni, dniType } = useSelector(representativeDniSelector, shallowEqual);
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNames = e => {
    setNames(e.target.value);
  };

  const handleLastNames = e => {
    setLastNames(e.target.value);
  };

  const handlePhone = e => {
    setPhone(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const validateInputs = () => {
    if (
      names.length === 0 ||
      lastNames.length === 0 ||
      phone.length === 0 ||
      email.length === 0
    )
      return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newRepresentative = {
      names,
      lastNames,
      phone,
      email,
      balance: 0,
      paidMonths: 0,
      inscription: false
    };
    dispatch(updateRepresentative(newRepresentative));
    history.push('/addStudent');
  };

  return (
    <div className="box add_representatives_box">
      <form
        className="sweet-form add_representatives_form"
        onSubmit={handleSubmit}
      >
        <img src={AddRepresentativeIlustration} alt="Ilustración" />
        <h1 className="box_title">Agregar un Representante</h1>
        <h2 className="box_title">{`${dniType} - ${dni}`}</h2>
        <Minput type="text" onChange={handleNames} label="Nombres:" />
        <Minput type="text" onChange={handleLastNames} label="Apellidos:" />
        <Minput type="number" onChange={handlePhone} label="Teléfono:" />
        <Minput
          type="email"
          onChange={handleEmail}
          label="Correo Electrónico:"
        />

        <div className="button_container">
          <Button
            type="button"
            onClick={() => history.goBack()}
            text="volver"
          />
          <Button type="submit" disabled={validateInputs()} text="agregar" />
        </div>
      </form>
    </div>
  );
};

export default AddRepresentative;
