const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select products http://localhost:3500/api/products
router.get('/products', async (req, res) => {
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

// // 1.- Add Products http://localhost:3500/api/products
// router.post('/products', (req, res) => {
//   const { product, price } = req.body;
//   const query = ` INSERT INTO products (product, price) VALUES (?, ?);
//      `;

//   mysqlConnection.query(query, [product, price], (err, rows) => {
//     if (!err) {
//       res.json({
//         status: 'ok',
//         id: rows.insertId
//       });
//     } else {
//       res.json({
//         status: 'error',
//         err
//       });
//     }
//   });
// });

// // 2.-Select Products http://localhost:3500/api/products
// router.get('/products', (req, res) => {
//   mysqlConnection.query('SELECT * from products', (err, rows, fields) => {
//     if (!err) {
//       res.json(rows);
//     } else {
//       console.log(err);
//     }
//   });
// });

// // 3.-Delete Products ---> http://localhost:3500/api/products
// router.delete('/products', (req, res) => {
//   const { id } = req.body;
//   const query = `  DELETE FROM products WHERE products.idproducts =(?);
//      `;

//   mysqlConnection.query(query, [id], (err, rows, fields) => {
//     if (!err) {
//       res.json({ status: 'ok' });
//     } else {
//       res.json({ status: 'error' });
//     }
//   });
// });

// //4.- Update Products---->http://localhost:3500/api/updProducts
// router.post('/updProducts', (req, res) => {
//   const { product, price } = req.body;
//   const query = ` CALL updProducts(?, ?);
//      `;

//   mysqlConnection.query(query, [product, price], (err, rows, fields) => {
//     if (!err) {
//       res.json({
//         status: 'ok'
//       });
//     } else {
//       res.json({
//         status: 'error',
//         err
//       });
//     }
//   });
// });

module.exports = router;
