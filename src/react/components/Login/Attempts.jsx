/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Actions
import { resetAttempts } from 'react/redux/actions/loginActions';

const Attempts = () => {
  const attempts = useSelector(state => state.login.attempts);
  const dispatch = useDispatch();

  // redirect to block screen
  if (attempts === 3) {
    let timerInterval;
    Swal.fire({
      title: 'Sesión Bloqueada!',
      icon: 'error',
      html: 'Debe esperar <b></b> segundos.',
      customClass: {
        content: 'content-class',
        title: 'title-class'
      },
      timer: 10000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              b.textContent = parseInt(Swal.getTimerLeft() / 1000, 10);
            }
          }
        }, 1000);
      },
      onClose: () => {
        clearInterval(timerInterval);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(() => {
      dispatch(resetAttempts());
    });
  }

  if (attempts < 1) return null;

  return (
    <div className="login-error">
      <p className="user-error">Usuario o contraseña incorrecta</p>
      <p className="user-error">Intentos restantes: {3 - attempts}</p>
      <Link
        className="pass-recover"
        to={{
          pathname: '/recover',
          state: {
            fromLogin: true
          }
        }}
      >
        ¿Recuperar usuario?
      </Link>
    </div>
  );
};

export default Attempts;
