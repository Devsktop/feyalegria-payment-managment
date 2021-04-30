import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'


import CalendarMonth from './CalendarMonth';

const Calendar = ({ months, balance, dolar, title, onClickArrow }) => {
  return (
    <div className="calendar">
      <div className="calendar_titlebox">
        {
          onClickArrow && (
            <>
              <FontAwesomeIcon icon={faCaretLeft} className="calendar_titlebox_arrow" onClick={() => onClickArrow("LEFT")} />
              <FontAwesomeIcon icon={faCaretRight} className="calendar_titlebox_arrow arrow_right" onClick={() => onClickArrow("RIGHT")} />
            </>
          )
        }
        <p className="calendar_titlebox_title">{title}</p>
      </div>
      <div className="calendar_months">
        {
          Object.keys(months).map(key => {
            const { month, status, onClick, id } = months[key];
            return <CalendarMonth month={month} status={status} onClick={onClick ? () => onClick(id) : null} key={id} />
          })
        }
      </div>
      <div className="calendar_status">
        <p>{`Saldo ${balance}$`}</p>
        <p>{`Saldo ${balance * dolar} Bs.S`}</p>
      </div>
    </div>)
};

Calendar.propTypes = {
  months: PropTypes.objectOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    status: PropTypes.number,
    onClick: PropTypes.func,
    id: PropTypes.number,
  })).isRequired,
  balance: PropTypes.number.isRequired,
  dolar: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClickArrow: PropTypes.func,
}

export default Calendar;


