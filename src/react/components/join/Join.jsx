import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { restoreConceptInscription } from 'react/redux/actions/conceptsActions';
import { updateRate } from 'react/redux/actions/ratesActions';

// Components
import JoinPrice from './JoinPrice';
import JoinValuePair from './JoinValuePair';
import JoinButtons from './JoinButtons';

const Join = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(restoreConceptInscription());
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateRate('INSCRIPTION'));
  };

  return (
    <div className="join content-screen">
      <form className="sweet-form box inscriptionBox" onSubmit={handleSubmit}>
        <h1 className="box_title">Administre Inscripción</h1>
        <JoinPrice />
        <JoinValuePair />
        <JoinButtons />
      </form>
    </div>
  );
};

Join.displayName = 'Join';

export default Join;
