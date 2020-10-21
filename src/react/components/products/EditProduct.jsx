import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// Actions
import { editProduct } from 'react/redux/actions/productsActions';

// Components
import Minput from 'react/components/Minput';

const EditProduct = props => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  // Selector
  const currentGrade = useSelector(state => state.products.products[id]);
  const [productName, setProductName] = useState(currentGrade.productName);
  const [price, setPrice] = useState(currentGrade.price);
  const history = useHistory();

  const handleProduct = e => {
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
      idProduct: id,
      productName,
      price
    };
    dispatch(editProduct(newProduct));
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
            editar producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
