import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Helper validators
import { decimalValidator, intValidator } from 'helper';

const ValuePair = ({
  changePairAction,
  pairSelector,
  pairKeys,
  id,
  removePairAction,
  valueDecimal
}) => {
  const dispatch = useDispatch();
  const valuePair = useSelector(state => pairSelector(state, id), shallowEqual);
  const [name, value] = pairKeys;
  console.log(valuePair);

  // OnChange
  const handleName = e => {
    const newConcept = {
      id,
      [name]: e.target.value,
      [value]: valuePair[value]
    };
    dispatch(changePairAction(newConcept));
  };

  const handleValue = e => {
    const newConcept = {
      id,
      [name]: valuePair[name],
      [value]: numberConvertion(e)
    };
    dispatch(changePairAction(newConcept));
  };

  const handleRemove = () => {
    dispatch(removePairAction(id));
  };

  const numberConvertion = e => {
    if (valueDecimal) {
      // If number ends with 0 or '.' does not parse it
      const decimal = decimalValidator(e, valuePair[value]);
      if (decimal.endsWith('.') || decimal.endsWith('0')) return decimal;
      return parseFloat(decimal) || 0;
    }
    return parseInt(intValidator(e, valuePair[value]), 10) || 0;
  };

  return (
    <div>
      <input type="text" onChange={handleName} value={valuePair[name]} />
      <input
        type="text"
        onKeyDown={handleValue}
        value={valuePair[value]}
        onChange={() => {}}
      />
      <FontAwesomeIcon icon={faMinus} onClick={handleRemove} />
    </div>
  );
};

ValuePair.propTypes = {
  changePairAction: PropTypes.func.isRequired,
  pairSelector: PropTypes.func.isRequired,
  removePairAction: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  pairKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  valueDecimal: PropTypes.bool
};

ValuePair.defaultProps = {
  valueDecimal: false
};

export default React.memo(ValuePair);