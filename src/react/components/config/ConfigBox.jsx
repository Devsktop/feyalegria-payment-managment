import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConfigBox = ({ ilustration, title, link }) => {
  return (
    <div className="box" title={title}>
      <p className="box_title">{title}</p>
      <img src={ilustration} alt="Ilustración" />
      <Link className="" to={link}>
        Seleccionar
      </Link>
    </div>
  );
};

ConfigBox.displayName = 'ConfigBox';

ConfigBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  link: PropTypes.string.isRequired
};
export default React.memo(ConfigBox);
