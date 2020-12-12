/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';
import { editStudent as fromStudentsActions } from 'react/redux/actions/studentsActions';
import { editStudent as fromIncommeActions } from 'react/redux/actions/incomeActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import RepresentativeData from '../income/RepresentativeData';

// Import imgs
import TimelinePersonal from '../income/TimelinePersonal.svg';
import TimelineScholar from '../income/TimelineScholar.svg';

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
const gradesSelector = state => state.grades.grades;

// Selector from StudentRow
const fromStudentRow = (state, id) => state.income.representative.students[id];

// Selector from students
const fromStudents = state => state.students.student;

const EditStudent = ({ match: { params } }) => {
  const isFetched = useSelector(state => state.grades.isFetched);
  const { id } = params;
  const history = useHistory();
  const { from } = history.location.state;
  const dispatch = useDispatch();

  const studentSelector = from === 'StudentRow' ? fromStudentRow : fromStudents;
  const StudentAction =
    from === 'StudentRow' ? fromIncommeActions : fromStudentsActions;
  // Selector
  const currentStudent = useSelector(state => studentSelector(state, id));

  const grades = useSelector(gradesSelector);

  const [form, setForm] = useState(true);
  const [names, setNames] = useState(currentStudent.names);
  const [lastNames, setLastNames] = useState(currentStudent.lastNames);
  const [idDniType, setIdDniType] = useState(currentStudent.idDniType);
  const [dni, setDni] = useState(currentStudent.dni);
  const [birthDate, setBirthDate] = useState(
    new Date(currentStudent.birthDate)
  );

  const [relationship, setRelationship] = useState(
    options.filter(option => option.label === currentStudent.relationship)[0]
      .value
  );
  const [scholarYear, setScholarYear] = useState({
    value: currentStudent.idGrade,
    label: currentStudent.gradeName
  });
  const [section, setSection] = useState({
    value: currentStudent.idSection,
    label: currentStudent.sectionName
  });
  const [status, setStatus] = useState(currentStudent.status);

  if (!isFetched) {
    dispatch(fetchGrades());
  }

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
    if (scholarYear && Object.keys(grades).length > 0) {
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
    const newStudent = {
      idStudent: id,
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
    dispatch(StudentAction(newStudent));
    history.goBack();
  };

  return (
    <div className="add_student_box">
      <RepresentativeData />
      <form className="sweet-form add_student_form" onSubmit={handleSubmit}>
        <h1 className="box_title">Editar Estudiante</h1>
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
              <Button
                type="button"
                onClick={() => history.goBack()}
                text="volver"
              />
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

export default EditStudent;
