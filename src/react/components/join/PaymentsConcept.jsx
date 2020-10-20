import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const PaymentConcept = ({ action, conceptSelector, id, removeAction }) => {
  const dispatch = useDispatch();
  const concept = useSelector(state => conceptSelector(state, id));
  console.log(concept);

  const handleName = e => {
    const newConcept = {
      idConcept: id,
      concept: e.target.value,
      price: concept.price
    };
    dispatch(action(newConcept));
  };
  const handleprice = e => {
    const newConcept = {
      idConcept: id,
      concept: concept.concept,
      price: e.target.value
    };
    dispatch(action(newConcept));
  };

  const handleRemove = () => {
    dispatch(removeAction(id));
  };

  return (
    <div>
      <input type="text" onChange={handleName} defaultValue={concept.concept} />
      <input type="text" onChange={handleprice} defaultValue={concept.price} />
      <FontAwesomeIcon icon={faMinus} onClick={handleRemove} />
    </div>
  );
};

PaymentConcept.propTypes = {
  action: PropTypes.func.isRequired,
  conceptSelector: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default React.memo(PaymentConcept);
