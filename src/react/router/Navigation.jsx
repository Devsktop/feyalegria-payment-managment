/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logOut } from 'react/redux/actions/loginActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlus,
  faAddressBook,
  faUserTie,
  faUserGraduate,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import DolarPortal from 'react/components/DolarPortal';
import NavIconLink from './NavIconLink';

const Navigation = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  const dispatch = useDispatch();
  const [showDolar, setShowDolar] = useState(false);
  const history = useHistory();

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

  // Handle dollar button
  const dolar = () => {
    setShowDolar(true);
  };

  const closeDolarPortal = () => {
    setShowDolar(false);
  };

  return (
    <nav className="navigation">
      <div className="container">
        <div className="logo">
          <p>Fe y alegría</p>
        </div>
        {dataLoaded && (
          <ul className="navbar">
            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/dashboard',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faHome} text="Inicio" />
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/income',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faPlus} text="Agregar ingreso" />
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/help',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faAddressBook} text="Registros" />
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/help',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faUserTie} text="Representantes" />
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/help',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faUserGraduate} text="Estudiantes" />
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/help',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faCreditCard} text="Precios" />
              </NavLink>
            </li>

            {/* <li className="navbar-item">
              <a className="navbar-link" href="#" onClick={exit}>
                <NavIconLink icon={faDoorOpen} text="Salir" />
              </a>
            </li> */}
          </ul>
        )}
      </div>
      {/* {showDolar && <DolarPortal onClose={closeDolarPortal} />} */}
    </nav>
  );
};

export default Navigation;
