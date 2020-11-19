import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { addStudent } from 'react/redux/actions/studentsActions';
import { resetRepresentative } from 'react/redux/actions/incomeActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import Select from 'react-select';
import RepresentativeData from './RepresentativeData';

// Import imgs
import Timeline from './Timeline.svg';

// Select options
const options = [
  { value: 'child', label: 'Hijo' },
  { value: 'nephew', label: 'Sobrino' },
  { value: 'nephew', label: 'Nieto' },
  { value: 'adopted', label: 'Adoptado' }
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

  // When path come from join student do not reset
  // representative but if it come from verifyrepresentative
  // reset it cause it could later insert a not existing dni
  // and last representative data will be displayed
  const handleGoBack = () => {
    if (
      representativeExist &&
      history.location.state.prevPath !== 'JoinStudent'
    ) {
      dispatch(resetRepresentative());
    }
    history.goBack();
  };

  return (
    <div className="add_student_box">
      <RepresentativeData />
      <form className="sweet-form add_student_form" onSubmit={handleSubmit}>
        <h1 className="box_title">Agregar un Estudiante</h1>
        <img src={Timeline} alt="" />
        <Minput type="text" onChange={handleNames} label="Nombres:" />
        <Minput type="text" onChange={handleLastNames} label="Apellidos:" />
        <Minput type="number" onChange={handleDni} label="Cédula:" />
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
          />
        </div>

        <div className="form-group">
          <label>Parentesco:</label>
          <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
          />
        </div>

        <div className="form-group">
          <label>Seleccione año escolar:</label>
          <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
          />
        </div>

        <div className="form-group">
          <label>Seleccione sección:</label>
          <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
          />
        </div>

        <div className="checkbox">
          <label className="container">
            Normal
            <input
              type="radio"
              checked={'mandatory'}
              onChange={'handleMandatory'}
            />
            <span className="checkmark" />
          </label>
        </div>

        <div className="checkbox">
          <label className="container">
            Becado
            <input
              type="radio"
              checked={'mandatory'}
              onChange={'handleMandatory'}
            />
            <span className="checkmark" />
          </label>
        </div>

        <div className="checkbox">
          <label className="container">
            Excento
            <input
              type="radio"
              checked={'mandatory'}
              onChange={'handleMandatory'}
            />
            <span className="checkmark" />
          </label>
        </div>

        <div className="button_container">
          <Button type="button" onClick={handleGoBack} text="volver" />
          <Button type="submit" disabled={validateInputs()} text="aceptar" />
        </div>
        <Button
          type="button"
          text="aceptar"
          onClick={() => {
            history.push('/JoinStudents');
          }}
        />
      </form>
    </div>
  );
};

export default AddStudent;
