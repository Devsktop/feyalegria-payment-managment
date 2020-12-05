import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';

// Actions
import { fetchRepresentatives } from 'react/redux/actions/representativesActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const representativesSelector = state => state.representatives.representatives;

const Representatives = () => {
  // States
  const [pag, setPag] = useState(0);
  // Link Params
  const { id } = useParams();
  // Link Query
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const grade = query.get('scholarYear');
  const section = query.get('section');
  // Dispatch
  const dispatch = useDispatch();
  // useSelectors
  const representatives = useSelector(representativesSelector);
  const isFetching = useSelector(state => state.representatives.isFetching);
  // useHistory
  const history = useHistory();

  let isEmpty = false;
  const representativesData = [];

  useEffect(() => {
    dispatch(fetchRepresentatives(id, pag));
  }, [pag, id]);

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (Object.keys(representatives).length === 0) {
    isEmpty = true;
  }

  Object.keys(representatives).forEach(representativeKey => {
    const { names, lastNames } = representatives[representativeKey];
    // Split to names & lastNames
    const name = names.split(' ');
    const lastName = lastNames.split(' ');
    // Array Destructuring
    const [shortName] = name;
    const [shortLastName] = lastName;
    // Equalize shortName & shortLastName in representatives's name & lastNames properties
    representatives[representativeKey].names = shortName;
    representatives[representativeKey].lastNames = shortLastName;
    // Convert representative object to an array for DataTable
    representativesData[representativeKey] = {
      ...representatives[representativeKey],
      id: representatives[representativeKey].idRepresentative
    };
  });

  const handleClick = idRepresentative =>
    history.push(`/representativeProfile/${idRepresentative}`);

  return (
    <div className="content-screen">
      <div className="box representatives_box_big">
        <h1 className="box_title">{`Representantes de ${grade} ${section}`}</h1>
        <h2 className="box_subtitle">Seleccione un Representante</h2>
        {isEmpty ? (
          <h2 className="box_subtitle">No hay representantes registrados</h2>
        ) : (
          <DataTable
            className="table"
            data={representativesData}
            properties={[
              'Nombre',
              'Apellido',
              'Cédula',
              'Teléfono',
              'Correo',
              'Saldo $'
            ]}
            order={['names', 'lastNames', 'dni', 'phone', 'email', 'balance']}
            onClickRow={handleClick}
          />
        )}
      </div>
    </div>
  );
};

Representatives.displayName = 'Representatives';

export default Representatives;
