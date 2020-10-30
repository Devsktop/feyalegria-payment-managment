import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { createProduct } from 'react/redux/actions/productsActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

// Selectors

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const history = useHistory();

  const handleProductName = e => {
    setProductName(e.target.value);
  };

  const handlePrice = e => {
    setPrice(e.target.value);
  };

  const handleMandatory = e => {
    setMandatory(e.target.checked);
  };

  const validateInputs = () => {
    if (productName.length === 0 || price.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newProduct = {
      productName,
      price,
      mandatory
    };
    dispatch(createProduct(newProduct, history));
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
          label="Precio $:"
        />
        <div className="checkbox">
          <label className="container">
            Obligatorio
            <input
              type="checkbox"
              checked={mandatory}
              onChange={handleMandatory}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="button_container">
          <Button
            type="button"
            onClick={() => history.goBack()}
            text="volver"
          />
          <Button
            type="submit"
            disabled={validateInputs()}
            text="añadir producto"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
