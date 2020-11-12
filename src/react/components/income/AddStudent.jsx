import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { addStudent } from 'react/redux/actions/studentsActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import RepresentativeData from './RepresentativeData';

const AddStudent = () => {
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

  return (
    <div className="add_student_box">
      <RepresentativeData />
      <form className="sweet-form add_student_form" onSubmit={handleSubmit}>
        <h1 className="box_title">Agregar un Estudiante</h1>
        <Minput type="text" onChange={handleNames} label="Nombres:" />
        <Minput type="text" onChange={handleLastNames} label="Apellidos:" />
        <Minput type="number" onChange={handleDni} label="Cédula:" />
        <Minput type="date" onChange={''} label="Fecha de Nacimiento:" />
        <Minput
          type="email"
          onChange={handleRelationship}
          label="Correo Electrónico:"
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

export default AddStudent;
