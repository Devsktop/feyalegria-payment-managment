import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// Actions
import { createProduct } from 'react/redux/actions/productsActions';

// Components
import Minput from 'react/components/Minput';

// Selectors
const productsSelector = state => state.products.products;

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const history = useHistory();

  const handleProductName = e => {
    setProductName(e.target.value);
  };

  const handlePrice = e => {
    setPrice(e.target.value);
  };

  const validateInputs = () => {
    if (productName.length === 0 || price.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newProduct = {
      productName,
      price
    };
    dispatch(createProduct(newProduct));
  };

  return (
    <div className="box">
      <form className="sweet-form product-form" onSubmit={handleSubmit}>
        <h1 className="box_title">Productos</h1>
        <Minput
          type="text"
          onChange={handleProductName}
          value={productName}
          label="Producto:"
        />
        <Minput
          type="number"
          onChange={handlePrice}
          value={price}
          label="Precio:"
        />
        <div className="button_container">
          <button
            type="button"
            className="button"
            onClick={() => history.goBack()}
          >
            volver
          </button>
          <button type="submit" className="button" disabled={validateInputs()}>
            crear producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
