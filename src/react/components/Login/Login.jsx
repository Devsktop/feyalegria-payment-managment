/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { resetAttempts, createDb } from 'react/redux/actions/loginActions';
import Swal from 'sweetalert2';
import LoginForm from './LoginForm';

const Login = () => {
  const logged = useSelector(state => state.login.logged);
  const isLogin = useSelector(state => state.login.isLogin);
  const attempts = useSelector(state => state.login.attempts);
  const db = useSelector(state => state.login.db);
  const dispatch = useDispatch();

  // When app runs it must verify db actually exixts
  // so it makes a fetch and if does not exist it is created
  // when db was verified 'db' is set to true in store
  // eslint-disable-next-line no-unused-vars
  const verifyDb = () => {
    if (!db) {
      const url = 'http://localhost:3500/api/tasks/verifyDB';
      const config = {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(url, config)
        .then(res => res.json())
        .then(res => {
          if (res.status === 'ok') {
            dispatch(createDb());
          }
        });
    }
  };

  useEffect(() => {
    // doc for development adpting, set it on back later
    // verifyDb();

    // Mula callback to simulate call to verifyDb
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(
        'Verifying DB, remember delete this message and set it on later'
      );
      dispatch(createDb());
    }, 2000);
  }, []);

  if (!db)
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );

  // If logged in redirect to cart screen
  if (logged)
    return (
      <Redirect
        to={{
          pathname: '/load',
          state: {
            linked: true
          }
        }}
      />
    );

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

  // If is log in load spinner
  if (isLogin)
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Verificando usuario...</p>
      </div>
    );

  return (
    <div className="container login-container">
      <LoginForm />
      {attempts > 0 && (
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
      )}
    </div>
  );
};

export default Login;
