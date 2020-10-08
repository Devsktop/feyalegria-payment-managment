/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createDb } from 'react/redux/actions/loginActions';
import LoginForm from './LoginForm';

const Login = () => {
  const logged = useSelector(state => state.login.logged);
  const isLogin = useSelector(state => state.login.isLogin);
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

  // If is log in load spinner
  if (isLogin)
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Verificando usuario...</p>
      </div>
    );

  return <LoginForm />;
};

export default Login;
