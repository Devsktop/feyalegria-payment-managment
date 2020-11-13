import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { addStudent } from 'react/redux/actions/studentsActions';
import { resetRepresentative } from 'react/redux/actions/incomeActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

const representativeExistSelector = state => {
  return state.income.representativeExist;
};

const AddStudent = () => {
  const representativeExist = useSelector(representativeExistSelector);
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [dni, setDni] = useState('');
  const [bornDate, setBornDate] = useState(new Date());
  const [relationship, setRelationship] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNames = e => {
    setNames(e.target.value);
  };

  const handleLastNames = e => {
    setLastNames(e.target.value);
  };

  const handleDni = e => {
    setDni(e.target.value);
  };

  const handleRelationship = e => {
    setRelationship(e.target.value);
  };

  const validateInputs = () => {
    if (
      names.length === 0 ||
      lastNames.length === 0 ||
      dni.length === 0 ||
      relationship.length === 0
    )
      return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const student = { names, lastNames, dni, bornDate, relationship };
    dispatch(addStudent(student, history));
  };

  const handleGoBack = () => {
    if (representativeExist) {
      dispatch(resetRepresentative());
      history.goBack();
    } else {
      history.goBack();
    }
  };

  return (
    <div className="box add_representatives_box">
      <form
        className="sweet-form add_representatives_form"
        onSubmit={handleSubmit}
      >
        <h1 className="box_title">Agregar un Estudiante</h1>
        <Minput type="text" onChange={handleNames} label="Nombres:" />
        <Minput type="text" onChange={handleLastNames} label="Apellidos:" />
        <Minput type="number" onChange={handleDni} label="Cédula:" />
        <Minput type="date" onChange={''} label="Teléfono:" />
        <Minput
          type="email"
          onChange={handleRelationship}
          label="Correo Electrónico:"
        />
        <div className="button_container">
          <Button type="button" onClick={handleGoBack} text="volver" />
          <Button type="submit" disabled={validateInputs()} text="aceptar" />
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
