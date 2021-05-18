import React from 'react';
import RepresentativeData from './RepresentativeData';
import PurchaseProducts from './PurchaseProducts';
import IncomeTotals from './IncomeTotals';
const PurchaseProductsBox = () => {
  return (
    <div className="box purchase_box">
      <RepresentativeData />
      <PurchaseProducts />
      <IncomeTotals />
    </div>
  );
};

export default PurchaseProductsBox;
