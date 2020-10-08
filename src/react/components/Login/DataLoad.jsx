import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { fetchData } from 'react/redux/actions/loginActions';

const DataLoad = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  const dispatch = useDispatch();

  // Load all the initial app data inmediatly after login
  // then data loaded is set to true
  useEffect(() => {
    if (!dataLoaded) dispatch(fetchData());
  }, []);

  // If data has already been loaded redirect to first user Screens
  if (dataLoaded)
    return (
      <Redirect
        to={{
          pathname: '/dashboard',
          state: {
            linked: true
          }
        }}
      />
    );

  return (
    <div className="loader-container">
      <div className="loader">Loading...</div>
      <p>Cargando datos al sistema...</p>
    </div>
  );
};

export default DataLoad;
