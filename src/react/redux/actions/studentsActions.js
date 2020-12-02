import Swal from 'sweetalert2';

export const FETCH_STUDENTS = 'FETCH_STUDENTS';

export const fetchStudents = async () => {
  const response = await fetch('http://localhost:3500/api/students');
  const students = await response.json();
  return {
    type: FETCH_STUDENTS,
    payload: students
  };
};

export const ADD_STUDENT = 'ADD_STUDENT';

const addStudenAction = student => ({
  type: ADD_STUDENT,
  payload: { student }
});

export const addStudent = (newStudent, history) => {
  return (dispatch, getState) => {
    Swal.fire({
      title: 'Creando Estudiante',
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
          bornDate,
          relationship,
          scholarYear,
          section,
          status
        } = newStudent;
        const url = 'http://localhost:3500/api/student';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            names,
            lastNames,
            dni,
            bornDate,
            relationship,
            scholarYear,
            section,
            status
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              dispatch(addStudenAction(res.student));
              Swal.hideLoading();
              Swal.fire({
                title: 'El Estudiante se ha registrado con éxito',
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
              // if student's  dni is already used
              Swal.hideLoading();
              Swal.fire({
                title: 'Ya existe un estudiante con esa cédula',
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
