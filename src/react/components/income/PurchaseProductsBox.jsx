import React from 'react';
import RepresentativeData from './RepresentativeData';
import PurchaseProducts from './PurchaseProducts';

const PurchaseProductsBox = () => {
  return (
    <div className="box purchase_box">
      <RepresentativeData />
      <PurchaseProducts />
    </div>
  );
};

export default PurchaseProductsBox;
