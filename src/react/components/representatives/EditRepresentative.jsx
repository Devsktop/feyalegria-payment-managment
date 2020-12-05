/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { editRepresentative } from 'react/redux/actions/representativesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import Select from 'react-select';

// Import imgs
import AddRepresentativeIlustration from '../income/AddRepresentativeIlustration.svg';

const dniTypeOptions = [
  { value: '1', label: 'V' },
  { value: '2', label: 'E' },
  { value: '3', label: 'P' },
  { value: '4', label: 'M' }
];

// Select Styles
const customStyles = {
  container: provided => ({
    ...provided,
    height: '40px',
    top: '7px'
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid #820101' : '1px solid #e32526'
  })
};

const EditRepresentative = ({ match: { params } }) => {
  const { id } = params;
  const dispatch = useDispatch();
  // Selector
  const currentRepresentative = useSelector(
    state => state.representatives.representative
  );
  const [names, setNames] = useState(currentRepresentative.names);
  const [lastNames, setLastNames] = useState(currentRepresentative.lastNames);
  const [dniOption, setDniOption] = useState(
    dniTypeOptions[currentRepresentative.idDniType - 1].value
  );
  const [dni, setDni] = useState(currentRepresentative.dni);
  const [phone, setPhone] = useState(currentRepresentative.phone);
  const [email, setEmail] = useState(currentRepresentative.email);
  const history = useHistory();

  const handleNames = e => {
    setNames(e.target.value);
  };

  const handleLastNames = e => {
    setLastNames(e.target.value);
  };

  const handleDniOption = e => {
    setDniOption(e.value);
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
      dniOption.length === 0 ||
      dni.length === 0 ||
      phone.length === 0 ||
      email.length === 0
    )
      return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const idDniType = dniOption;

    const newRepresentative = {
      idRepresentative: id,
      names,
      lastNames,
      idDniType,
      dni,
      phone,
      email
    };
    dispatch(editRepresentative(newRepresentative, history));
  };

  return (
    <div className="box add_representatives_box">
      <form
        className="sweet-form add_representatives_form"
        onSubmit={handleSubmit}
      >
        <img src={AddRepresentativeIlustration} alt="Ilustración" />
        <h1 className="box_title">Editar Representante</h1>
        <Minput
          type="text"
          onChange={handleNames}
          label="Nombres:"
          value={names}
        />
        <Minput
          type="text"
          onChange={handleLastNames}
          label="Apellidos:"
          value={lastNames}
        />

        <div className="form-group-dni">
          <Select
            options={dniTypeOptions}
            defaultValue={dniTypeOptions[0]}
            value={dniTypeOptions[dniOption - 1]}
            styles={customStyles}
            onChange={handleDniOption}
          />
          <Minput
            type="number"
            onChange={handleDni}
            label="Cédula:"
            value={dni}
          />
        </div>

        <Minput
          type="number"
          onChange={handlePhone}
          label="Teléfono:"
          value={phone}
        />
        <Minput
          type="email"
          onChange={handleEmail}
          label="Correo Electrónico:"
          value={email}
        />

        <div className="button_container">
          <Button
            type="button"
            onClick={() => history.goBack()}
            text="volver"
          />
          <Button type="submit" disabled={validateInputs()} text="editar" />
        </div>
      </form>
    </div>
  );
};

export default EditRepresentative;
