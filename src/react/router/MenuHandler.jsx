import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Actions
import { showMenu } from 'react/redux/actions/upperbarActions';

// Assets
import logo from './logo.png';

const MenuHandler = () => {

      // eslint-disable-next-line no-unused-vars
  const handleMenu = () => {
    dispatch(showMenu());
  };
    return (   
        <span className="upper_bar_right">
            <img src={logo} alt="logo" className="upper_bar_logo" />
            <FontAwesomeIcon
            icon={faBars}
            className="upper_bar_menu"
            onClick={handleMenu}
            />
      </span>
     );
}
 
export default MenuHandler;