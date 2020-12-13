import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Components
import Button from 'react/components/Button';
import { DataTable } from 'react-pulpo';

// Actions
import { fetchStudentById } from 'react/redux/actions/studentsActions';

// Import imgs
import ProfilePic from '../representatives/ProfilePic.svg';
import NameIcon from './NameIcon.svg';
import DniIcon from '../representatives/DniIcon.svg';
import BirthDateIcon from './BirthDateIcon.svg';
import GradeIcon from './GradeIcon.svg';
import StateIcon from './StateIcon.svg';
import BalanceIcon from '../representatives/BalanceIcon.svg';

// Selectors
const studentSelector = state => state.students.student;

const dolarSelector = state => state.upperbar.dolar;

const StudentProfile = () => {
  // Link Params
  const { id } = useParams();
  const history = useHistory();
  // Dispatch
  const dispatch = useDispatch();
  // useSelectors
  const student = useSelector(studentSelector);
  const isFetching = useSelector(state => state.representatives.isFetching);
  const dolarPrice = useSelector(dolarSelector);

  const studentsData = [];

  useEffect(() => {
    dispatch(fetchStudentById(id));
  }, []);

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  //   if (Object.keys(student).length > 0) {
  //     Object.keys(representative.students).forEach(studentKey => {
  //       const { names, lastNames, grade, section } = representative.students[
  //         studentKey
  //       ];
  //       // Split to names & lastNames
  //       const name = names.split(' ');
  //       const lastName = lastNames.split(' ');
  //       // Array Destructuring
  //       const [shortName] = name;
  //       const [shortLastName] = lastName;
  //       // Concat name & lastName / grade & section
  //       const fullName = `${shortName} ${shortLastName}`;
  //       const fullGrade = `${grade} ${section}`;
  //       // Convert students object to an array for DataTable
  //       studentsData[studentKey] = {
  //         ...representative.students[studentKey],
  //         id: representative.students[studentKey].idStudent,
  //         names: fullName,
  //         grade: fullGrade
  //       };
  //     });
  //   }

  // Date
  const date = new Date(student.birthDate);
  const day = `${`0${date.getDate()}`.slice(-2)}`;
  const month = `${`0${date.getMonth() + 1}`.slice(-2)}`;
  const year = date.getFullYear();
  const finalDate = `${day}-${month}-${year}`;

  const bsPrice = student.balance * dolarPrice;

  const handleClick = () => {
    console.log(id);
    history.push({
      pathname: `/editStudent/${id}`,
      state: {
        from: 'StudentProfile'
      }
    });
  };

  return (
    <div className="content-screen">
      {student ? (
        <div className="box representative_profile_box">
          <img src={ProfilePic} alt="" />
          <div className="profile_header">
            <h1 className="box_title">Perfil del Estudiante</h1>
            <Button
              type="button"
              onClick={() => history.push('')}
              text="estatus de pago"
            />
          </div>
          <div className="representative_data">
            <div className="representative_data_group">
              <img src={NameIcon} alt="" />
              <p>{`${student.names} ${student.lastNames}`}</p>
            </div>
            <div className="representative_data_group">
              <img src={DniIcon} alt="" />
              <p>{`${student.dniType}-${student.dni}`}</p>
            </div>
            <div className="representative_data_group">
              <img src={BirthDateIcon} alt="" />
              <p>{finalDate}</p>
            </div>
            <div className="representative_data_group">
              <img src={GradeIcon} alt="" />
              <p>{`${student.scholarYear} ${student.section}`}</p>
            </div>
            <div className="representative_data_group">
              <img src={StateIcon} alt="" />
              <p>{student.status}</p>
            </div>
            <div className="representative_data_group">
              <img src={BalanceIcon} alt="" />
              <p
                className={student.balance >= 0 ? 'green' : 'red'}
              >{`${student.balance} $ / ${bsPrice} Bs.S`}</p>
            </div>
          </div>

          {/* <DataTable
            className="table"
            data={studentsData}
            properties={['Nombre', 'Cédula', 'Parentesco', 'Grado']}
            order={['names', 'dni', 'relationship', 'grade']}
            // onClickRow={handleClick}
          /> */}

          <div className="button_container">
            <Button
              type="button"
              onClick={() => history.goBack()}
              text="volver"
            />
            <Button type="button" text="editar" onClick={handleClick} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default StudentProfile;
