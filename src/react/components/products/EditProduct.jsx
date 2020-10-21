import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
      <form className="sweet-form" onSubmit={handleSubmit}>
        <h1>Productos</h1>
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

        <button
          type="submit"
          className="button button-large button-accept"
          disabled={validateInputs()}
        >
          editar producto
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
