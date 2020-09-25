import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { fetchData } from 'react/redux/actions/loginActions';

const DataLoad = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  const dispatch = useDispatch();

  // Simulate call to api to get initial data - DELETE THIS FUNTION LATER
  const dataLoadedMula = () => {
    if (!dataLoaded) {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log(
          'simulate fetching initial data, remember to delete this later'
        );
        dispatch({ type: 'DATA_LOADED' });
      }, 2000);
    }
  };

  // Load all the initial app data inmediatly after login
  // then data loaded is set to true
  useEffect(() => {
    // Original call
    // if (!dataLoaded) dispatch(fetchData());

    // delete this function later
    dataLoadedMula();
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
