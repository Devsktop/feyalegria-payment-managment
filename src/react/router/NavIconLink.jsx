/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const NavIconLink = ({ icon, text }) => {
  return (
    <span className="nav-icon">
      <span className="icon">
        <FontAwesomeIcon icon={icon} />
      </span>
      <p>{text}</p>
    </span>
  );
};

NavIconLink.displayName = 'NavIconLink';

NavIconLink.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default NavIconLink;
