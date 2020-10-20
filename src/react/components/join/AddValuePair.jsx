import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Components
import ValuePairBox from './ValuePairBox';

const AddValuePair = ({
  changePairAction,
  boxSelector,
  pairSelector,
  addPairAction,
  removePairAction
}) => {
  const dispatch = useDispatch();
  const [lastId, setLastId] = useState(-1);

  const handleController = () => {
    const newConcept = {
      idConcept: lastId,
      concept: '',
      price: 0
    };
    setLastId(id => id - 1);
    dispatch(addPairAction(newConcept));
  };

  return (
    <div className="valuepair">
      <div className="valuepair_controller">
        <p>Añadir concepto de pago</p>
        <FontAwesomeIcon icon={faPlus} onClick={handleController} />
      </div>
      <ValuePairBox
        boxSelector={boxSelector}
        pairSelector={pairSelector}
        changePairAction={changePairAction}
        removePairAction={removePairAction}
      />
    </div>
  );
};

AddValuePair.propTypes = {
  changePairAction: PropTypes.func.isRequired,
  addPairAction: PropTypes.func.isRequired,
  boxSelector: PropTypes.func.isRequired,
  removePairAction: PropTypes.func.isRequired,
  pairSelector: PropTypes.func.isRequired
};

export default AddValuePair;
