import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import {
  fetchProducts,
  deleteProduct
} from 'react/redux/actions/productsActions';

// Components
import Button from 'react/components/Button';
import { DataTable } from 'react-pulpo';

// Selectors
const productsSelector = state => state.products.products;

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);
  const isFetched = useSelector(state => state.products.isFetched);
  const isFetching = useSelector(state => state.products.isFetching);
  const history = useHistory();

  if (isFetching) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (!isFetched) {
    dispatch(fetchProducts());
  }

  let isEmpty = false;
  if (Object.keys(products).length === 0) {
    isEmpty = true;
  }

  const productsData = [];
  Object.keys(products).forEach(productKey => {
    productsData.push({
      ...products[productKey],
      id: products[productKey].idProduct,
      price: parseFloat(products[productKey].price),
      mandatory: products[productKey].mandatory ? 'Si' : 'No'
    });
  });

  const handleDelete = id => dispatch(deleteProduct(id));

  const handleClick = id => history.push(`/editProduct/${id}`);

  return (
    <div className="content-screen">
      <div className="box productsBox">
        <h1 className="box_title">Productos</h1>
        {isEmpty ? (
          <h2 className="box_subtitle">
            No hay productos registrados
            <br />
            Presiona
            <span> Agregar producto</span>
          </h2>
        ) : (
          <DataTable
            className="table"
            data={productsData}
            properties={['Producto', 'Precio $', 'Obligatorio']}
            order={['productName', 'price', 'mandatory']}
            deleteRow={handleDelete}
            onClickRow={handleClick}
          />
        )}
        <Button link="/addProduct" text="agregar producto" />
      </div>
    </div>
  );
};

Products.displayName = 'Products';

export default Products;
