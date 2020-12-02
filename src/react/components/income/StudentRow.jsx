/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const StudentRow = ({ student }) => {
  const [check, setCheck] = useState(false);
  const { names, lastnames, dni, relationship, grade, section } = student;
  return (
    <div
      className={`studentrow ${check ? 'checked' : ''}`}
      onClick={() => setCheck(!check)}
    >
      <span className="checkmark">
        <FontAwesomeIcon icon={faCheck} className="checkicon" />
      </span>
      <span>{`${names} ${lastnames}`}</span>
      <span>{dni}</span>
      <span>{relationship}</span>
      <span>{`${grade} ${section}`}</span>
    </div>
  );
};

export default StudentRow;

StudentRow.propTypes = {
  student: PropTypes.shape({
    names: PropTypes.string.isRequired,
    lastnames: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    relationship: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired
  }).isRequired
};
