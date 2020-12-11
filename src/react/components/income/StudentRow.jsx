/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { toggleStudent } from 'react/redux/actions/incomeActions';

const StudentRow = ({ student }) => {
  const disipatch = useDispatch();
  const history = useHistory();
  const [check, setCheck] = useState(false);
  const {
    names,
    lastNames,
    dni,
    relationship,
    gradeName,
    sectionName,
    idStudent
  } = student;

  const handleToggleStudent = () => {
    setCheck(!check);
    disipatch(toggleStudent(idStudent, !check));
  };

  return (
    <div
      className={`studentrow ${check ? 'checked' : ''}`}
      onClick={handleToggleStudent}
      onContextMenu={() =>
        history.push({
          pathname: `editStudent/${idStudent}`,
          state: {
            from: 'StudentRow'
          }
        })
      }
    >
      <span className="checkmark">
        <FontAwesomeIcon icon={faCheck} className="checkicon" />
      </span>
      <span>{`${names} ${lastNames}`}</span>
      <span>{dni}</span>
      <span>{relationship}</span>
      <span>{`${gradeName} ${sectionName}`}</span>
    </div>
  );
};

export default StudentRow;

StudentRow.propTypes = {
  student: PropTypes.shape({
    names: PropTypes.string.isRequired,
    lastNames: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    relationship: PropTypes.string.isRequired,
    gradeName: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
    idStudent: PropTypes.number.isRequired
  }).isRequired
};
