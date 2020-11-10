import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

// Actions
import { fetchRepresentativeByDni } from 'react/redux/actions/representativesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

// Import imgs
import DniIlustration from './DniIlustration.svg';

const VerifyRepresentative = () => {
  const [dniOption, setDniOption] = useState('');
  const [representativesDni, setrepresentativesDni] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // Select options
  const options = [
    { value: 1, label: 'V' },
    { value: 2, label: 'E' },
    { value: 3, label: 'P' },
    { value: 4, label: 'M' }
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
      border: state.isFocused ? '1px solid #820101' : '1px solid #e32526',
      width: '75px'
    })
  };

  const handleDniOption = e => {
    setDniOption(e.value);
  };

  const handleRepresentativesDni = e => {
    setrepresentativesDni(e.target.value);
  };

  const validateInputs = () => {
    if (representativesDni.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchRepresentativeByDni(representativesDni, history));
  };

  return (
    <div className="box verify_representatives_box">
      <form
        className="sweet-form verify_representatives_form"
        onSubmit={handleSubmit}
      >
        <img src={DniIlustration} alt="Ilustración" />
        <h1 className="box_title">Ingresar Cédula del Representante</h1>
        <div className="form-group">
          <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
            onChange={handleDniOption}
          />
          <Minput
            type="number"
            onChange={handleRepresentativesDni}
            label="Cédula del Representante:"
          />
        </div>
        <div className="button_container">
          <Button
            type="button"
            onClick={() => history.goBack()}
            text="volver"
          />
          <Button type="submit" disabled={validateInputs()} text="aceptar" />
        </div>
      </form>
    </div>
  );
};

export default VerifyRepresentative;
