import React from 'react';
import { useSelector } from 'react-redux';
import ProductBox from './ProductBox';

import IncomeTotals from './IncomeTotals';
import PurchaseProductsButtons from './PurchaseProductsButtons';

const productsSelector = state => {
  const { products } = state.income;
  return products;
};

const mandatoryBoughtProductsSelector = state => {
  const { idProducts } = state.income.representative;
  return idProducts;
};

const PurchaseProducts = () => {
  const products = useSelector(productsSelector);
  const mandatoryBoughtProducts = useSelector(mandatoryBoughtProductsSelector);

  return (
    <div className="purchase">
      <h1 className="purchase_title">Productos Adicionales</h1>
      <div className="purchase_boxes">
        {Object.keys(products).map(productKey => {
          const { productName, price, mandatory, amount } = products[
            productKey
          ];

          if (
            mandatory &&
            !mandatoryBoughtProducts.includes(parseInt(productKey, 10))
          )
            return (
              <ProductBox
                product={productName}
                price={price}
                idProduct={productKey}
                amount={amount}
                mandatory={mandatory}
                key={productKey}
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
                key={productKey}
              />
            );
          return null;
        })}
      </div>
      <div className="purchase_box_bottom">
        <IncomeTotals />
        <PurchaseProductsButtons />
      </div>
    </div>
  );
};

export default PurchaseProducts;
