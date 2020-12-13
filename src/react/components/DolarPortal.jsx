/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setDolar } from 'react/redux/actions/upperbarActions';

// Components
import Minput from './Minput';

const DolarPortal = ({ onClose }) => {
  const dispatch = useDispatch();
  const initialDolar = useSelector(state => state.upperbar.dolar);
  const [dolar, setDolarValue] = useState(initialDolar);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validateInput = e => {
    if (e.endsWith(' ')) return false;
    if (e.length === 15) return false;
    if (e.charAt(e.length - 1).match(/\D/)) return false;
    return true;
  };

  const handleDolar = e => {
    if (validateInput(e.target.value)) setDolarValue(e.target.value);
  };

  const disableAccept = () => {
    if (dolar === '' || parseInt(dolar, 10) < 1) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setDolar(parseInt(dolar, 10)));
    if (onClose) onClose();
  };

  return ReactDOM.createPortal(
    <div className="portal">
      <div className="portal-box">
        <form className="sweet-form" onSubmit={handleSubmit}>
          <Minput
            type="input"
            onChange={handleDolar}
            value={dolar !== '' ? parseInt(dolar, 10) : 0}
            inputRef={inputRef}
            label="Ingrese Precio del dolar:"
            id="standardt-dolar"
            className="center"
          />
          <div className="button_container">
            <div className={`btn ${onClose ? null : 'button-large'}`}>
              <div className="inner"></div>
              <button
                type="submit"
                className="button"
                disabled={disableAccept()}
              >
                Aceptar
              </button>
            </div>
            {onClose && (
              <div className="btn">
                <div className="inner"></div>
                <button type="button" onClick={onClose} className="button">
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default DolarPortal;
