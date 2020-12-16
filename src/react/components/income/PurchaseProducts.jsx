import React from 'react';
import { useSelector } from 'react-redux';
import ProductBox from './ProductBox';

const productsSelector = state => {
  const { products } = state.income;
  return products;
};

const PurchaseProducts = () => {
  const products = useSelector(productsSelector);

  return (
    <div className="purchase">
      <h1 className="purchase_title">Productos Adicionales</h1>
      <div className="purchase_boxes">
        {Object.keys(products).map(productKey => {
          const { productName, price, mandatory, amount } = products[
            productKey
          ];
          if (mandatory)
            return (
              <ProductBox
                product={productName}
                price={price}
                idProduct={productKey}
                amount={amount}
                mandatory={mandatory}
              />
            );
          return null;
        })}
        {Object.keys(products).map(productKey => {
          const { productName, price, mandatory, amount } = products[
            productKey
          ];
          if (!mandatory)
            return (
              <ProductBox
                product={productName}
                price={price}
                idProduct={productKey}
                amount={amount}
                mandatory={mandatory}
              />
            );
          return null;
        })}
      </div>
    </div>
  );
};

export default PurchaseProducts;
