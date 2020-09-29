import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Actions
import { logOut } from 'react/redux/actions/loginActions';
import { showMenu } from 'react/redux/actions/upperbarActions';

// Components
import DolarPortalHandler from './DolarPortalHandler';
import Logout from './Logout';

// Assets
import logo from './logo.png';

const UpperBar = () => {
  const dispatch = useDispatch();

  const dataLoaded = useSelector(state => state.login.dataLoaded);
  if (!dataLoaded) return null;

  // eslint-disable-next-line no-unused-vars
  const handleMenu = () => {
    dispatch(showMenu());
  };

  return (
    <div className="upper_bar">
      <span className="upper_bar_right">
        <img src={logo} alt="logo" className="upper_bar_logo" />
        <FontAwesomeIcon
          icon={faBars}
          className="upper_bar_menu"
          onClick={handleMenu}
        />
      </span>

      <DolarPortalHandler />
      <Logout />
    </div>
  );
};

export default UpperBar;
