import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import ValuePair from './ValuePair';

const ValuePairBox = ({
  changePairAction,
  boxSelector,
  pairSelector,
  removePairAction,
  pairKeys,
  valueDecimal
}) => {
  const valuePair = useSelector(boxSelector);
  console.log(valuePair);
  return (
    <div className="valuepair_box">
      {Object.keys(valuePair).map(key => (
        <ValuePair
          key={parseInt(key, 10)}
          changePairAction={changePairAction}
          removePairAction={removePairAction}
          pairSelector={pairSelector}
          pairKeys={pairKeys}
          id={parseInt(key, 10)}
          valueDecimal={valueDecimal}
        />
      ))}
    </div>
  );
};

ValuePairBox.propTypes = {
  changePairAction: PropTypes.func.isRequired,
  boxSelector: PropTypes.func.isRequired,
  removePairAction: PropTypes.func.isRequired,
  pairSelector: PropTypes.func.isRequired,
  pairKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  valueDecimal: PropTypes.bool
};

ValuePairBox.defaultProps = {
  valueDecimal: false
};

export default ValuePairBox;
