import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({ text, link, onClick, disabled }) => {
  let button;

  if (link) {
    button = (
      <Link className="button" to={link}>
        {text}
      </Link>
    );
  } else {
    button = (
      // eslint-disable-next-line react/button-has-type
      <button
        type={onClick ? 'button' : 'submit'}
        className="button"
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  return (
    <div className="btn">
      <div className="inner" />
      {button}
    </div>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  link: null,
  onClick: null,
  disabled: false
};
