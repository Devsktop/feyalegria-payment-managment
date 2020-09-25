import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHandHoldingUsd,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Actions
import { logOut } from 'react/redux/actions/loginActions';

// Components
import DolarPortal from 'react/components/DolarPortal';

const UpperBar = () => {
  const dispatch = useDispatch();
  const [showDolar, setShowDolar] = useState(false);
  const history = useHistory();

  const dataLoaded = useSelector(state => state.login.dataLoaded);
  if (!dataLoaded) return null;

  // Handle dollar button
  const dolar = () => {
    setShowDolar(true);
  };

  const closeDolarPortal = () => {
    setShowDolar(false);
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
        <img src="logo192.png" alt="logo" className="upper_bar_logo" />
        <FontAwesomeIcon icon={faBars} className="upper_bar_menu" />
      </span>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <span className="upper_bar_dolar" onClick={dolar}>
        <FontAwesomeIcon
          icon={faHandHoldingUsd}
          className="upper_bar_dolar_icon"
        />
        <span className="upper_bar_dolar_price">350.000Bs.S</span>
      </span>

      <FontAwesomeIcon
        icon={faDoorOpen}
        className="upper_bar_exit"
        onClick={exit}
      />
      {showDolar && <DolarPortal onClose={closeDolarPortal} />}
    </div>
  );
};

export default UpperBar;
