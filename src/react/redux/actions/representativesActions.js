import { updateRepresentative } from 'react/redux/actions/incomeActions';
import Swal from 'sweetalert2';

export const FETCH_REPRESENTATIVEBYDNI = 'FETCH_REPRESENTATIVEBYDNI';

export const fetchRepresentativeByDni = (dni, idDniType, history) => {
  return async dispatch => {
    // HACER FETCH A LA BDD
    const res = await fetch(
      `http://localhost:3500/api/representativesbydni/${dni}`
    );

    const { representative, status } = await res.json();

    if (status === 200) {
      dispatch(updateRepresentative({ ...representative }));
      const hasStudents = Object.keys(representative.students).length > 0;
      if (hasStudents) {
        history.push('/joinStudents');
      } else {
        history.push('/addStudent');
      }
    } else if (status === 404) {
      dispatch(updateRepresentative({ dni, idDniType }));
      history.push('/addRepresentative');
    } else {
      console.log('remember swal');
    }
  };
};

export const IS_FECTHING = 'IS_FECTHING';

// fetching: boolean
const isFetching = fetching => ({
  type: IS_FECTHING,
  payload: fetching
});

export const IS_FECTHED = 'IS_FECTHED';

// fetched: boolean
const isFetched = () => ({
  type: IS_FECTHED
});

export const ADD_REPRESENTATIVE = 'ADD_REPRESENTATIVE';

const addRepresentativeAction = representative => ({
  type: ADD_REPRESENTATIVE,
  payload: { representative }
});

export const addRepresentative = (newRepresentative, history) => {
  return (dispatch, getState) => {
    Swal.fire({
      title: 'Creando Representante',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const {
          names,
          lastNames,
          dni,
          phone,
          email,
          balance,
          paidMonths,
          inscription,
          idDniType
        } = newRepresentative;
        const url = 'http://localhost:3500/api/representative';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            names,
            lastNames,
            dni,
            phone,
            email,
            balance,
            paidMonths,
            inscription,
            idDniType
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              dispatch(addRepresentativeAction(res.representative));
              Swal.hideLoading();
              Swal.fire({
                title: 'El representante se ha registrado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                },
                preConfirm: () => {
                  history.push('/addStudent');
                }
              });
            } else if (res.errAddGrade === 1062) {
              // if product's  name is already used
              Swal.hideLoading();
              Swal.fire({
                title: 'Ya existe un representante con esa cédula',
                text: '',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                }
              });
            }
          })
          .catch(err => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};
