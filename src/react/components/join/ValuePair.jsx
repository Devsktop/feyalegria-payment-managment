import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ValuePair = ({
  changePairAction,
  pairSelector,
  id,
  removePairAction
}) => {
  const dispatch = useDispatch();
  const concept = useSelector(state => pairSelector(state, id));
  console.log(concept);

  const handleName = e => {
    const newConcept = {
      idConcept: id,
      concept: e.target.value,
      price: concept.price
    };
    dispatch(changePairAction(newConcept));
  };
  const handleprice = e => {
    const newConcept = {
      idConcept: id,
      concept: concept.concept,
      price: e.target.value
    };
    dispatch(changePairAction(newConcept));
  };

  const handleRemove = () => {
    dispatch(removePairAction(id));
  };

  return (
    <div>
      <input type="text" onChange={handleName} defaultValue={concept.concept} />
      <input type="text" onChange={handleprice} defaultValue={concept.price} />
      <FontAwesomeIcon icon={faMinus} onClick={handleRemove} />
    </div>
  );
};

ValuePair.propTypes = {
  changePairAction: PropTypes.func.isRequired,
  pairSelector: PropTypes.func.isRequired,
  removePairAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default React.memo(ValuePair);
