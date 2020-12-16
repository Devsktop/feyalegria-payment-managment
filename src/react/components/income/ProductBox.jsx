import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ProductBox = ({
  product,
  price,
  idProduct,
  handleMinus,
  handlePlus,
  amount
}) => {
  return (
    <div className="product_box">
      <FontAwesomeIcon icon={faCoins} />
      <div className="product_box_desc">
        <p>{product}</p>
        <p>{price}</p>
      </div>
      <div className="product_box_counter">
        <button
          type="button"
          className="minus"
          onClick={() => handleMinus(idProduct)}
        >
          -
        </button>
        <span className="number">{amount}</span>
        <button
          type="button"
          className="plus"
          onClick={() => handlePlus(idProduct)}
        >
          +
        </button>
      </div>
    </div>
  );
};

ProductBox.propTypes = {
  product: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  idProduct: PropTypes.number.isRequired,
  handleMinus: PropTypes.func.isRequired,
  handlePlus: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired
};

export default ProductBox;
