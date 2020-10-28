import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'react/redux/actions/loginActions';

// components
import Minput from 'react/components/Minput';
import Attempts from './Attempts';

// Assets
import logo from '../logo.png';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const avoidSpaces = value => {
    if (value.endsWith(' ')) return false;
    return true;
  };

  const handleUser = e => {
    if (avoidSpaces(e.target.value)) setUser(e.target.value);
  };
  const handlePass = e => {
    if (avoidSpaces(e.target.value)) setPass(e.target.value);
  };

  const validateInputs = () => {
    if (user.length === 0 || pass.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userLog = { user, pass };
    dispatch(login(userLog));
  };
  return (
    <div className="login">
      <img src={logo} alt="logo" className="logo" />
      <form className="sweet-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>
        <Minput
          type="text"
          onChange={handleUser}
          value={user}
          label="Usuario:"
        />
        <Minput
          type="password"
          onChange={handlePass}
          value={pass}
          label="Contraseña:"
        />
        <div className="btn button-large">
          <div className="inner"></div>
          <button type="submit" className="button" disabled={validateInputs()}>
            Ingresar
          </button>
        </div>
        <Attempts />
      </form>
    </div>
  );
};

export default LoginForm;
