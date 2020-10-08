/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  faHome,
  faPlus,
  faAddressBook,
  faUserTie,
  faUserGraduate,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import NavIconLink from './NavIconLink';

const Menu = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  const showMenu = useSelector(state => state.upperbar.showMenu);

  if (!dataLoaded) return null;
  return (
    <nav className={`menu ${showMenu ? 'open' : ''}`}>
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
              pathname: '/register',
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
              pathname: '/representatives',
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
              pathname: '/students',
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
              pathname: '/config',
              state: {
                linked: true
              }
            }}
          >
            <NavIconLink icon={faCreditCard} text="Precios" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
