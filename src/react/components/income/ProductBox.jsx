import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Actions
import {
  addProduct,
  substractProduct
} from 'react/redux/actions/incomeActions';

const ProductBox = ({ product, price, idProduct, amount, mandatory }) => {
  const dispatch = useDispatch();

  const handlePlus = () => {
    dispatch(addProduct(idProduct));
  };

  const handleMinus = () => {
    dispatch(substractProduct(idProduct));
  };
  return (
    <div className={`product_box ${mandatory ? 'mandatory' : ''}`}>
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
      <div className="mandatory_check">*</div>
    </div>
  );
};

ProductBox.propTypes = {
  product: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  idProduct: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  mandatory: PropTypes.number.isRequired
};

export default React.memo(ProductBox);
