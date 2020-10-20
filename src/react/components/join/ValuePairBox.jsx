import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import ValuePair from './ValuePair';

const ValuePairBox = ({
  changePairAction,
  boxSelector,
  pairSelector,
  removePairAction
}) => {
  const valuePair = useSelector(boxSelector);
  console.log(valuePair);
  return (
    <div className="valuepair_box">
      {Object.keys(valuePair).map(key => (
        <ValuePair
          key={key}
          changePairAction={changePairAction}
          removePairAction={removePairAction}
          pairSelector={pairSelector}
          id={key}
        />
      ))}
    </div>
  );
};

ValuePairBox.propTypes = {
  changePairAction: PropTypes.func.isRequired,
  boxSelector: PropTypes.func.isRequired,
  removePairAction: PropTypes.func.isRequired,
  pairSelector: PropTypes.func.isRequired
};

export default ValuePairBox;
