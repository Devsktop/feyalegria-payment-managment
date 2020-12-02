import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { fetchGrades } from 'react/redux/actions/gradesActions';

// Components
import { DataTable } from 'react-pulpo';

// Selectors
const representativesSelector = state => state.representatives.representatives;

const Representatives = () => {
  const dispatch = useDispatch();
  const representatives = useSelector(representativesSelector);
  const isFetched = useSelector(state => state.representatives.isFetched);
  const isFetching = useSelector(state => state.representatives.isFetching);
  const history = useHistory();

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (!isFetched) {
    dispatch(fetchRepresentatives());
  }

  let isEmpty = false;
  if (Object.keys(representatives).length === 0) {
    isEmpty = true;
  }

  const representativesData = [];
  Object.keys(representatives).forEach(representativeKey => {
    representativesData.push({
      ...representatives[representativeKey],
      id: representatives[representativeKey].idRepresentative
    });
  });

  // const handleClick = id => history.push(`/editProduct/${id}`s);

  return (
    <div className="content-screen">
      <div className="box representatives_box">
        <h1 className="box_title">Representantes</h1>
        <h2 className="box_subtitle">Seleccionar un Represetante</h2>
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
              'Saldo $',
              'Saldo Bs.S'
            ]}
            order={[
              'scholarYear',
              'sectionsNumber',
              'representativestudents',
              'gradeRepresentatives'
            ]}
            // onClickRow={handleClick}
          />
        )}
      </div>
    </div>
  );
};

Representatives.displayName = 'Representatives';

export default Representatives;
