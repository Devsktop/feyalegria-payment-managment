/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { editProduct } from 'react/redux/actions/productsActions';

// Components
import Button from 'react/components/Button';
import Minput from 'react/components/Minput';

const EditProduct = ({ match: { params } }) => {
  const { id } = params;
  const dispatch = useDispatch();
  // Selector
  const currentProduct = useSelector(state => state.products.products[id]);
  const [productName, setProductName] = useState(currentProduct.productName);
  const [price, setPrice] = useState(currentProduct.price);
  const [mandatory, setMandatory] = useState(currentProduct.mandatory);
  const history = useHistory();

  const handleProduct = e => {
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
      idProduct: id,
      productName,
      price,
      mandatory
    };
    dispatch(editProduct(newProduct, history));
  };

  return (
    <div className="box">
      <form className="sweet-form product-form" onSubmit={handleSubmit}>
        <h1 className="box_title">Productos</h1>
        <Minput
          type="text"
          onChange={handleProduct}
          value={productName}
          label="Producto:"
        />
        <Minput
          type="number"
          onChange={handlePrice}
          value={parseFloat(price)}
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
            <span className="checkmark" />
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
            className="button"
            disabled={validateInputs()}
            text="editar product"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
