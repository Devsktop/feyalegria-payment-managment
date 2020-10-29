import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchRepresentativeByDni } from 'react/redux/actions/representativesActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

// Import imgs
import DniIlustration from './DniIlustration.svg';

const VerifyRepresentative = () => {
  const [representativesDni, setrepresentativesDni] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

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
        <Minput
          type="number"
          onChange={handleRepresentativesDni}
          label="Cédula del Representante:"
        />
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
