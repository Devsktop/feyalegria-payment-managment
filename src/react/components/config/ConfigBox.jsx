import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConfigBox = ({ ilustration, title, link }) => {
  return (
    <div className="config_box" title={title}>
      <img src={ilustration} alt="Ilustración" />
      <h1 className="box_title">{title}</h1>
      <Link className="button" to={link}>
        Seleccionar
      </Link>
    </div>
  );
};

ConfigBox.displayName = 'ConfigBox';

ConfigBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ilustration: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
export default ConfigBox;
