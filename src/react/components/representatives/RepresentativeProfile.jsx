import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Components
import Button from 'react/components/Button';
import { DataTable } from 'react-pulpo';

// Actions
import { fetchRepresentativeById } from 'react/redux/actions/representativesActions';

// Import imgs
import ProfilePic from './ProfilePic.svg';
import NameIcon from './NameIcon.svg';
import DniIcon from './DniIcon.svg';
import PhoneIcon from './PhoneIcon.svg';
import EmailIcon from './EmailIcon.svg';
import BalanceIcon from './BalanceIcon.svg';

// Selectors
const representativesSelector = state => state.representatives.representative;

const dolarSelector = state => state.upperbar.dolar;

const RepresentativeProfile = () => {
  // Link Params
  const { idRepresentative } = useParams();
  const history = useHistory();
  // Dispatch
  const dispatch = useDispatch();
  // useSelectors
  const representative = useSelector(representativesSelector);
  const isFetching = useSelector(state => state.representatives.isFetching);
  const dolarPrice = useSelector(dolarSelector);

  const studentsData = [];

  useEffect(() => {
    dispatch(fetchRepresentativeById(idRepresentative));
  }, []);

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (Object.keys(representative).length > 0) {
    Object.keys(representative.students).forEach(studentKey => {
      const { names, lastNames, grade, section } = representative.students[
        studentKey
      ];
      // Split to names & lastNames
      const name = names.split(' ');
      const lastName = lastNames.split(' ');
      // Array Destructuring
      const [shortName] = name;
      const [shortLastName] = lastName;
      // Concat name & lastName / grade & section
      const fullName = `${shortName} ${shortLastName}`;
      const fullGrade = `${grade} ${section}`;
      // Convert students object to an array for DataTable
      studentsData[studentKey] = {
        ...representative.students[studentKey],
        id: representative.students[studentKey].idStudent,
        names: fullName,
        grade: fullGrade
      };
    });
  }

  const bsPrice = representative.balance * dolarPrice;

  const handleClick = () =>
    history.push(`/editRepresentative/${idRepresentative}`);

  return (
    <div className="content-screen">
      {representative ? (
        <div className="box representative_profile_box">
          <img src={ProfilePic} alt="" />
          <div className="profile_header">
            <h1 className="box_title">Perfil del Representante</h1>
            <Button
              type="button"
              onClick={() => history.push('')}
              text="estatus de pago"
            />
          </div>
          <div className="representative_data">
            <div className="representative_data_group">
              <img src={NameIcon} alt="" />
              <p>{`${representative.names} ${representative.lastNames}`}</p>
            </div>
            <div className="representative_data_group">
              <img src={DniIcon} alt="" />
              <p>{`${representative.dniType}-${representative.dni}`}</p>
            </div>
            <div className="representative_data_group">
              <img src={PhoneIcon} alt="" />
              <p>{representative.phone}</p>
            </div>
            <div className="representative_data_group">
              <img src={EmailIcon} alt="" />
              <p>{representative.email}</p>
            </div>
            <div className="representative_data_group">
              <img src={BalanceIcon} alt="" />
              <p
                className={representative.balance >= 0 ? 'green' : 'red'}
              >{`${representative.balance} $ / ${bsPrice} Bs.S`}</p>
            </div>
          </div>

          <DataTable
            className="table"
            data={studentsData}
            properties={['Nombre', 'C??dula', 'Parentesco', 'Grado']}
            order={['names', 'dni', 'relationship', 'grade']}
            // onClickRow={handleClick}
          />

          <div className="button_container">
            <Button
              type="button"
              onClick={() => history.goBack()}
              text="volver"
            />
            <Button type="submit" text="editar" onClick={handleClick} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default RepresentativeProfile;
