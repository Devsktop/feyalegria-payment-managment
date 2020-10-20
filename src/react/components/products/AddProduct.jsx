import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { createProduct } from 'react/redux/actions/productsActions';

// Components
import Minput from 'react/components/Minput';

// Selectors
const productsSelector = state => state.products.products;

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);

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
    <div className="addGradesBox">
      <form className="sweet-form" onSubmit={handleSubmit}>
        <h1>Productos</h1>
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

        <button
          type="submit"
          className="button button-large button-accept"
          disabled={validateInputs()}
        >
          crear producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
