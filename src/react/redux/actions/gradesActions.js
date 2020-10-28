import Swal from 'sweetalert2';

export const FETCH_GRADES = 'FETCH_GRADES';

export const fetchGrades = () => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch('http://localhost:3500/api/grades');
    const grades = await response.json();
    dispatch(fetchGradesActions(grades));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchGradesActions = grades => ({
  type: FETCH_GRADES,
  payload: { grades }
});

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

// Action To Delete Grade
export const DELETE_GRADE = 'DELETE_GRADE';

export function deleteGrade(id) {
  return dispatch => {
    Swal.fire({
      title: '¿Seguro que desea eliminar este Grado?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      customClass: {
        icon: 'icon-class',
        title: 'title-class',
        content: 'content-class'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        Swal.getCancelButton().style.display = 'none';
        const url = 'http://localhost:3500/api/grade';
        const config = {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config).then(res => res.json());
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      console.log(result);
      if (result.value === 200) {
        dispatch(deleteGradeAction(id));
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El Grado ha sido eliminado satisfactoriamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            icon: 'icon-class',
            title: 'title-class',
            content: 'content-class'
          }
        });
      } else if (result.value === 1451) {
        // if a grade has sections
        Swal.hideLoading();
        Swal.fire({
          title: 'Este grado no puede ser eliminado',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            icon: 'icon-class',
            title: 'title-class'
          }
        });
      }
    });
  };
}

const deleteGradeAction = id => ({
  type: DELETE_GRADE,
  payload: { id }
});

export const CREATE_GRADE = 'CREATE_GRADE';

const createGradeAction = grade => ({
  type: CREATE_GRADE,
  payload: { grade }
});

export const createGrade = (grade, history) => {
  return (dispatch, getState) => {
    Swal.fire({
      title: 'Creando grado',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();

        const { scholarYear, gradesSections } = grade;
        const url = 'http://localhost:3500/api/grade';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            scholarYear,
            gradesSections
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              dispatch(createGradeAction(res.grade));
              Swal.hideLoading();
              Swal.fire({
                title: 'El grado se ha registrado con éxito',
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
            } else if (res.errAddGrade === 1062) {
              // if product's  name is already used
              Swal.hideLoading();
              Swal.fire({
                title: 'Ya existe un grado con ese nombre',
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

export const EDIT_GRADE = 'EDIT_GRADE';

const editGradeAction = grade => ({
  type: EDIT_GRADE,
  payload: { grade }
});

export const editGrade = (grade, history) => {
  return dispatch => {
    Swal.fire({
      title: 'Modificando grado',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const { idGrade, scholarYear, gradesSections } = grade;

        const url = 'http://localhost:3500/api/updGrade';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            idGrade,
            scholarYear,
            gradesSections
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              dispatch(editGradeAction(res.grade));
              Swal.hideLoading();
              Swal.fire({
                title: 'El grado se ha modificado con éxito',
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
              // if grade's  name is already used
              Swal.hideLoading();
              Swal.fire({
                title: 'Ya existe un grado con ese nombre',
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
