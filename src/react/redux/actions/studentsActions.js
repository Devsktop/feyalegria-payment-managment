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

export const EDIT_STUDENT = 'EDIT_STUDENT';

const editStudentActions = student => ({
  type: EDIT_STUDENT,
  payload: { student }
});

export const editStudent = (student, history) => {
  return dispatch => {
    Swal.fire({
      title: 'Modificando estudiante',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const {
          idStudent,
          names,
          lastNames,
          dniOption,
          dni,
          bornDate,
          relationship,
          idGrade,
          idSection,
          gradeName,
          sectionName,
          status
        } = student;
        const url = 'http://localhost:3500/api/updStudent';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            idStudent,
            names,
            lastNames,
            dniOption,
            dni,
            bornDate,
            relationship,
            idGrade,
            idSection,
            gradeName,
            sectionName,
            status
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
              dispatch(editStudentActions(student));
              Swal.hideLoading();
              Swal.fire({
                title: 'El estudiante se ha modificado con éxito',
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
              // if student's dni is already used
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
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const IS_FETCHING_STUDENTS = 'IS_FETCHING_STUDENTS';

// fetching: boolean
const isFetching = fetching => ({
  type: IS_FETCHING_STUDENTS,
  payload: fetching
});

export const IS_FETCHED_STUDENTS = 'IS_FETCHED_STUDENTS';

// fetched: boolean
const isFetched = () => ({
  type: IS_FETCHED_STUDENTS
});

export const FETCH_STUDENTSBYSECTION = 'FETCH_STUDENTSBYSECTION';

export const fetchStudentsBySection = (id, pag) => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch(
      `http://localhost:3500/api/students/${id}?pag=${pag}`
    );
    const studentsBySection = await response.json();
    dispatch(fetchStudentsBySectionActions(studentsBySection));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchStudentsBySectionActions = studentsBySection => ({
  type: FETCH_STUDENTSBYSECTION,
  payload: { studentsBySection }
});

export const FETCH_STUDENTBYID = 'FETCH_STUDENTBYID';

export const fetchStudentById = id => {
  return async dispatch => {
    dispatch(isFetching(true));
    // HACER FETCH A LA BDD
    const response = await fetch(`http://localhost:3500/api/studentbyid/${id}`);
    const student = await response.json();
    dispatch(fetchStudentByIdActions(student));
    dispatch(isFetched());
    dispatch(isFetching(false));
  };
};

const fetchStudentByIdActions = student => ({
  type: FETCH_STUDENTBYID,
  payload: { student }
});
