import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

// Actions
import { addRepresentative } from 'react/redux/actions/representativesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

// Import imgs
import AddRepresentativeIlustration from './AddRepresentativeIlustration.svg';

const AddRepresentative = () => {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const options = [
    { value: 'V', label: 'V' },
    { value: 'E', label: 'E' },
    { value: 'P', label: 'P' },
    { value: 'M', label: 'M' }
  ];

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      height: '40px',
      top: '7px'
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #820101' : '1px solid #e32526',
      width: '75px'
    })
  };

  const handleNames = e => {
    setNames(e.target.value);
  };

  const handleLastNames = e => {
    setLastNames(e.target.value);
  };

  const handleDni = e => {
    setDni(e.target.value);
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
      dni.length === 0 ||
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
      dni,
      phone,
      email,
      balance: 0,
      paidMonths: 0,
      inscription: false,
      idDniType: 1
    };
    dispatch(addRepresentative(newRepresentative, history));
  };

  return (
    <div className="box add_representatives_box">
      <form
        className="sweet-form add_representatives_form"
        onSubmit={handleSubmit}
      >
        <img src={AddRepresentativeIlustration} alt="Ilustración" />
        <h1 className="box_title">Agregar un Representante</h1>
        <Minput type="text" onChange={handleNames} label="Nombres:" />
        <Minput type="text" onChange={handleLastNames} label="Apellidos:" />
        <div className="form-group">
          <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
          />
          <Minput
            type="number"
            onChange={handleDni}
            label="Cédula:"
            className="dni_Input"
          />
        </div>
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
