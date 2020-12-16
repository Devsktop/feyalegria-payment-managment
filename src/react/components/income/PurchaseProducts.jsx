import React from 'react';
import ProductBox from './ProductBox';

const PurchaseProducts = () => {
  return (
    <div className="purchase">
      <h1 className="purchase_title">Productos Adicionales</h1>
      <ProductBox
        product="Insignia Escolar"
        price={2}
        idProduct={58}
        amount={10}
        handlePlus={id => console.log(id)}
        handleMinus={id => console.log(id)}
      />
    </div>
  );
};

export default PurchaseProducts;
