import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// Actions
import {
  fetchProducts,
  deleteProduct
} from 'react/redux/actions/productsActions';

// Components
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
      price: parseFloat(products[productKey].price)
    });
  });

  const handleDelete = id => dispatch(deleteProduct(id));

  const handleClick = id => history.push(`/editProduct/${id}`);

  return (
    <div className="content-screen">
      <div className="gradesBox">
        <h1>Productos</h1>
        {isEmpty ? (
          <h2>Agregue un producto</h2>
        ) : (
          <DataTable
            className="table"
            data={productsData}
            properties={['Producto', 'Precio']}
            order={['productName', 'price']}
            deleteRow={handleDelete}
            onClickRow={handleClick}
          />
        )}
        <Link className="" to="/addProduct">
          agregar producto
        </Link>
      </div>
    </div>
  );
};

Products.displayName = 'Products';

export default Products;
