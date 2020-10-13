import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const DataBox = ({ desc, icon, data, link }) => {
  console.log('renderizé ', desc);
  return (
    <Link to={link}>
      <div className="box">
        <span>
          <FontAwesomeIcon icon={icon} className="icon" />
          {desc}
        </span>
        <p>{data}</p>
      </div>
    </Link>
  );
};

DataBox.displayName = 'DataBox';

DataBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  desc: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired
};
export default React.memo(DataBox);
