/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const IncomeBox = ({ ilustration, title, link, onClick }) => {
  return (
    <div className="addincome_box" title={title}>
      <img src={ilustration} alt="Ilustración" />
      <h1 className="box_title">{title}</h1>
      <div className="btn">
        <div className="inner" />
        <Link className="button" to={link} onClick={onClick}>
          Seleccionar
        </Link>
      </div>
    </div>
  );
};

IncomeBox.displayName = 'IncomeBox';

IncomeBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ilustration: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

IncomeBox.defaultProps = {
  onClick: null
};

export default IncomeBox;
