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
  removePairAction,
  pairKeys,
  valueDecimal,
  pairLabels,
  type
}) => {
  const dispatch = useDispatch();
  const [lastId, setLastId] = useState(-1);
  const [name, value] = pairKeys;

  const handleController = () => {
    const newConcept = {
      id: lastId,
      [name]: '',
      [value]: ''
    };
    setLastId(id => id - 1);
    dispatch(addPairAction(newConcept, type));
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
        pairKeys={pairKeys}
        valueDecimal={valueDecimal}
        pairLabels={pairLabels}
        type={type}
      />
    </div>
  );
};

AddValuePair.propTypes = {
  changePairAction: PropTypes.func.isRequired,
  addPairAction: PropTypes.func.isRequired,
  boxSelector: PropTypes.func.isRequired,
  removePairAction: PropTypes.func.isRequired,
  pairSelector: PropTypes.func.isRequired,
  pairKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  valueDecimal: PropTypes.bool,
  pairLabels: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired
};

AddValuePair.defaultProps = {
  valueDecimal: false,
  pairLabels: ['name', 'value']
};

export default AddValuePair;
