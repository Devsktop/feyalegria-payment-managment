import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// actions
import { logOut } from 'react/redux/actions/loginActions';

const Logout = () => {
  const dispatch = useDispatch();
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
  return (
    <FontAwesomeIcon
      icon={faDoorOpen}
      className="upper_bar_exit"
      onClick={exit}
    />
  );
};

export default Logout;
