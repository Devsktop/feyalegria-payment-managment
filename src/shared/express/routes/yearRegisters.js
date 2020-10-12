const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select yearRegisters http://localhost:3500/api/yearRegisters
router.get('/yearRegisters', async (req, res) => {
  // Query to get Products
  const { products, errGetProducts } = await getProducts();

  if (errGetProducts) {
    res.status(400).json({ errGetProducts });
    return null;
  }

  console.log(products);

  res.status(200).json(products);

  return res;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get Join
const getProducts = async () => {
  const products = {};
  const query = `SELECT idProduct, product, price, mandatory FROM products;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetProducts, rows) => {
      if (!errGetProducts) {
        rows.forEach(row => {
          products[row.idProduct] = { ...row };
        });
        resolve({ products });
      } else {
        resolve({ errGetProducts });
      }
    });
  });
};

module.exports = router;
