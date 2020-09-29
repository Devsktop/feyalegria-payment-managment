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

// Assets
import logo from './logo.png';

const UpperBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dataLoaded = useSelector(state => state.login.dataLoaded);
  if (!dataLoaded) return null;

  // eslint-disable-next-line no-unused-vars
  const handleMenu = () => {
    dispatch(showMenu());
  };

  // Handle exit button
  const exit = e => {
    e.preventDefault();

    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '',
      icon: 'warning',
      customClass: {
        icon: 'icon-class',
        title: 'title-class',
        content: 'content-class'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        dispatch(logOut());
        history.push('/login');
      }
    });
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

      <FontAwesomeIcon
        icon={faDoorOpen}
        className="upper_bar_exit"
        onClick={exit}
      />
    </div>
  );
};

export default UpperBar;
