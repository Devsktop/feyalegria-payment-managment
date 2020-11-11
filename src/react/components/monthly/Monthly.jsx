import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { restoreConceptInscription } from 'react/redux/actions/conceptsActions';
import { updateRate } from 'react/redux/actions/ratesActions';

// Components
import MonthlyPrice from './MonthlyPrice';
import MonthlyValuePair from './MonthlyValuePair';
import MonthlyButtons from './MonthlyButtons';

const Monthly = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(restoreConceptInscription());
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateRate('MONTHLYPAYMENT'));
  };

  return (
    <div className="join content-screen">
      <form className="sweet-form box inscriptionBox" onSubmit={handleSubmit}>
        <h1 className="box_title">Administre Mensualidad</h1>
        <MonthlyPrice />
        <MonthlyValuePair />
        <MonthlyButtons />
      </form>
    </div>
  );
};

Monthly.displayName = 'Monthly';

export default Monthly;
