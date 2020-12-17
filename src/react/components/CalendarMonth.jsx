import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faMinusCircle,
  faDotCircle
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const CalendarMonth = ({ month, status }) => {
  let icon;
  if (status === 1) icon = faCheckCircle;
  else if (status === 2) icon = faMinusCircle;
  else icon = faDotCircle;
  return (
    <div className="calendar_month">
      <span className="calendar_month_name">{month}</span>
      <div className="calendar_month_status">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

CalendarMonth.propTypes = {
  month: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default CalendarMonth;
