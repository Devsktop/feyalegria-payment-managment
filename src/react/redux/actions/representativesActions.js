import {
  updateRepresentative,
  existRepresentative
} from 'react/redux/actions/incomeActions';
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
      dispatch(existRepresentative(true));
      const hasStudents = Object.keys(representative.students).length > 0;
      if (hasStudents) {
        history.push('/joinStudents');
      } else {
        history.push('/addStudent');
      }
    } else if (status === 404) {
      dispatch(updateRepresentative({ dni, idDniType }));
      dispatch(existRepresentative(false));
      history.push('/addRepresentative');
    } else {
      console.log('remember swal');
    }
  };
};

export const IS_FECTHING_REPRESENTATIVES = 'IS_FECTHING_REPRESENTATIVES';

// fetching: boolean
const isFetching = fetching => ({
  type: IS_FECTHING_REPRESENTATIVES,
  payload: fetching
});

export const IS_FECTHED_REPRESENTATIVES = 'IS_FECTHED_REPRESENTATIVES';

// fetched: boolean
const isFetched = () => ({
  type: IS_FECTHED_REPRESENTATIVES
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

export const FETCH_REPRESENTATIVES = 'FETCH_REPRESENTATIVES';

export const fetchRepresentatives = (id, pag) => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch(
      `http://localhost:3500/api/representatives/${id}?pag=${pag}`
    );
    const representatives = await response.json();
    dispatch(fetchRepresentativesActions(representatives));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchRepresentativesActions = representatives => ({
  type: FETCH_REPRESENTATIVES,
  payload: { representatives }
});

export const FETCH_REPRESENTATIVEBYID = 'FETCH_REPRESENTATIVEBYID';

export const fetchRepresentativeById = id => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch(
      `http://localhost:3500/api/representativebyid/${id}`
    );
    const representative = await response.json();
    dispatch(fetchRepresentativeByIdActions(representative));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchRepresentativeByIdActions = representative => ({
  type: FETCH_REPRESENTATIVEBYID,
  payload: { representative }
});

export const EDIT_REPRESENTATIVE = 'EDIT_REPRESENTATIVE';

const editRepresentativeAction = representative => ({
  type: EDIT_REPRESENTATIVE,
  payload: { representative }
});

export const editRepresentative = (representative, history) => {
  return dispatch => {
    Swal.fire({
      title: 'Modificando representante',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const {
          idRepresentative,
          names,
          lastNames,
          idDniType,
          dni,
          phone,
          email
        } = representative;
        const url = 'http://localhost:3500/api/updRepresentative';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            idRepresentative,
            names,
            lastNames,
            idDniType,
            dni,
            phone,
            email
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              dispatch(editRepresentativeAction(representative));
              Swal.hideLoading();
              Swal.fire({
                title: 'El representante se ha modificado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                },
                preConfirm: () => {
                  history.goBack();
                }
              });
            } else if (res.err.errno === 1062) {
              // if representative's dni is already used
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
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};
