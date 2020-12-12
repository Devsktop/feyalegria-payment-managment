/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';
import {
  resetRepresentative,
  addStudent
} from 'react/redux/actions/incomeActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import RepresentativeData from './RepresentativeData';

// Import imgs
import TimelinePersonal from './TimelinePersonal.svg';
import TimelineScholar from './TimelineScholar.svg';

// Import Css
import 'react-datepicker/dist/react-datepicker.css';

// Select options
const options = [
  { value: '0', label: 'Hijo' },
  { value: '1', label: 'Sobrino' },
  { value: '2', label: 'Nieto' },
  { value: '3', label: 'Adoptado' }
];

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

// Selectors
const representativeExistSelector = state => {
  return state.income.representativeExist;
};

const gradesSelector = state => state.grades.grades;

const AddStudent = () => {
  const representativeExist = useSelector(representativeExistSelector);
  const grades = useSelector(gradesSelector);
  const isFetched = useSelector(state => state.grades.isFetched);
  const [form, setForm] = useState(true);
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [idDniType, setIdDniType] = useState(1);
  const [dni, setDni] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [relationship, setRelationship] = useState('');
  const [scholarYear, setScholarYear] = useState('');
  const [section, setSection] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const gradesData = [];
  const sectionsData = [];
  // Convert Grades object to array
  Object.keys(grades).forEach(gradeKey => {
    gradesData[gradeKey] = {
      value: grades[gradeKey].idGrade.toString(),
      label: grades[gradeKey].scholarYear
    };
  });

  useEffect(() => {
    if (scholarYear) {
      const { value } = scholarYear;
      Object.keys(grades[value].gradesSections).forEach(sectionKey => {
        sectionsData[sectionKey] = {
          value: grades[value].gradesSections[sectionKey].idSection.toString(),
          label: grades[value].gradesSections[sectionKey].section
        };
      });
    }
    // Change Section's Select Options
  }, [scholarYear, form, section, status]);

  if (!isFetched) {
    dispatch(fetchGrades());
  }

  const handleNames = e => {
    setNames(e.target.value);
  };

  const handleLastNames = e => {
    setLastNames(e.target.value);
  };

  const handleidDniType = e => {
    setIdDniType(e.value);
  };

  const handleDni = e => {
    setDni(e.target.value);
  };

  const handleRelationship = e => {
    setRelationship(e.value);
  };

  const validatePersonalInputs = () => {
    if (
      names.length === 0 ||
      lastNames.length === 0 ||
      idDniType.length === 0 ||
      dni.length === 0 ||
      birthDate.length === 0 ||
      relationship.length === 0
    )
      return true;
    return false;
  };

  const handleScholarYear = e => {
    setScholarYear(e);
    setSection('');
  };

  const handleSection = e => {
    setSection(e);
  };

  const handleStatus = e => {
    setStatus(e.target.value);
  };

  const validateScholarInputs = () => {
    if (!scholarYear.value || !section.value || status.length === 0)
      return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const idGrade = parseInt(scholarYear.value, 10);
    const idSection = parseInt(section.value, 10);
    const gradeName = scholarYear.label;
    const sectionName = section.label;
    const student = {
      names,
      lastNames,
      idDniType,
      dni,
      birthDate,
      relationship: options[relationship].label,
      idGrade,
      idSection,
      gradeName,
      sectionName,
      status
    };
    dispatch(addStudent(student));
    history.push('/JoinStudents');
  };

  // When path come from join student do not reset
  // representative but if it come from verifyrepresentative
  // reset it cause it could later insert a not existing dni
  // and last representative data will be displayed
  const handleGoBack = () => {
    if (representativeExist) {
      if (!history.location.state) {
        dispatch(resetRepresentative());
      }
    }
    history.goBack();
  };

  return (
    <div className="add_student_box">
      <RepresentativeData />
      <form className="sweet-form add_student_form" onSubmit={handleSubmit}>
        <h1 className="box_title">Agregar un Estudiante</h1>
        {form ? (
          <div className="personal">
            <img src={TimelinePersonal} alt="" />
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
                value={dniTypeOptions[idDniType - 1]}
                styles={customStyles}
                onChange={handleidDniType}
              />
              <Minput
                type="number"
                onChange={handleDni}
                label="Cédula:"
                value={dni}
              />
            </div>

            <div className="form-group">
              <label>Fecha de nacimiento:</label>
              <DatePicker
                selected={birthDate}
                onChange={date => setBirthDate(date)}
              />
            </div>

            <div className="form-group">
              <label>Parentesco:</label>
              <Select
                options={options}
                defaultValue={options[relationship]}
                styles={customStyles}
                onChange={handleRelationship}
                placeholder="Seleccione parentesco"
              />
            </div>

            <div className="button_container">
              <Button type="button" onClick={handleGoBack} text="volver" />
              <Button
                type="button"
                disabled={validatePersonalInputs()}
                text="aceptar"
                onClick={() => setForm(false)}
              />
            </div>
          </div>
        ) : (
          <div className="scholar">
            <img src={TimelineScholar} alt="" />
            <div className="form-group">
              <label>Seleccione año escolar:</label>
              <Select
                options={gradesData}
                defaultValue={scholarYear}
                onChange={handleScholarYear}
                styles={customStyles}
                placeholder="Seleccione un año escolar"
              />
            </div>
            <div className="form-group">
              <label>Seleccione sección:</label>
              <Select
                options={sectionsData}
                value={section || ''}
                onChange={handleSection}
                styles={customStyles}
                placeholder="Seleccione una sección"
              />
            </div>

            <label>Condición del estudiante</label>
            <div className="radios">
              <div className="radio">
                <label>
                  Regular
                  <input
                    type="radio"
                    name="status"
                    onChange={handleStatus}
                    value="regular"
                    checked={status === 'regular' ? 'checked' : ''}
                  />
                  <span className="checkmark" />
                </label>
              </div>

              <div className="radio">
                <label>
                  Becado
                  <input
                    type="radio"
                    name="status"
                    onChange={handleStatus}
                    value="scholarship"
                    checked={status === 'scholarship' ? 'checked' : ''}
                  />
                  <span className="checkmark" />
                </label>
              </div>

              <div className="radio">
                <label>
                  Excento
                  <input
                    type="radio"
                    name="status"
                    onChange={handleStatus}
                    value="exempt"
                    checked={status === 'exempt' ? 'checked' : ''}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>

            <div className="button_container button_container_submit">
              <Button
                type="button"
                onClick={() => setForm(true)}
                text="volver"
              />
              <Button
                type="submit"
                disabled={validateScholarInputs()}
                text="agregar"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddStudent;
