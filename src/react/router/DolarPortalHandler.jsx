import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

// Components
import DolarPortal from 'react/components/DolarPortal';

const DolarPortalHandler = () => {
  const initialDolar = useSelector(state => state.upperbar.dolar);
  const [showDolar, setShowDolar] = useState(false);

  // Handle dollar button
  const openDolarPortal = () => {
    setShowDolar(true);
  };

  const closeDolarPortal = () => {
    setShowDolar(false);
  };

  let dolarPortal;

  // Show dolar portal if value is zero even if it's not set
  if (initialDolar === 0) {
    dolarPortal = <DolarPortal />;
  } else if (showDolar) {
    dolarPortal = <DolarPortal onClose={closeDolarPortal} />;
  } else {
    dolarPortal = null;
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <span className="upper_bar_dolar" onClick={openDolarPortal}>
        <FontAwesomeIcon
          icon={faHandHoldingUsd}
          className="upper_bar_dolar_icon"
        />
        <span className="upper_bar_dolar_price">
          {parseInt(initialDolar, 10)}
        </span>
      </span>
      {dolarPortal}
    </>
  );
};

export default DolarPortalHandler;
