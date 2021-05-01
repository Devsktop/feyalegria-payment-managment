/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faMinusCircle,
  faDotCircle
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const CalendarMonth = ({ month, status, onClick }) => {
  let icon;
  let iconClass = '';
  if (status === 1) {
    icon = faCheckCircle;
    iconClass = 'solvent';
  } else if (status === 2) {
    icon = faMinusCircle;
    iconClass = 'insolvent';
  } else if (status === 3) {
    icon = faDotCircle;
    iconClass = 'payment';
  } else {
    icon = faDotCircle;
    iconClass = "undecored"
  }
  return (
    <div
      className={`calendar_month ${onClick ? 'action' : ''} `}
      onClick={onClick}
    >
      <p className={`calendar_month_name ${iconClass === "undecored" ? 'undecored' : ''}`}>{month}</p>
      <div className={`calendar_month_status ${iconClass}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

CalendarMonth.propTypes = {
  month: PropTypes.string.isRequired,
  status: PropTypes.number,
  onClick: PropTypes.func
};

CalendarMonth.defaultProps = {
  onClick: null
};

export default CalendarMonth;
