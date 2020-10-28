import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ type, text, link, onClick, disabled }) => {
  const linkButton = (
    <Link className="button" to={link}>
      {text}
    </Link>
  );
  const button = (
    // eslint-disable-next-line react/button-has-type
    <button
      type={onClick ? 'button' : 'submit'}
      className="button"
      disabled={disabled || false}
      onClick={onClick || null}
    >
      {text}
    </button>
  );

  return (
    <div className="btn">
      <div className="inner" />
      {link ? linkButton : button}
    </div>
  );
};

export default Button;
