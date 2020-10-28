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

  res.status(200).json(products);
  return null;
});

// 2.-Delete Product ---> http://localhost:3500/api/product
router.delete('/product', async (req, res) => {
  const { id } = req.body;
  // Query to delete product
  const { status, errDeleteProduct } = await deleteProduct(id);
  if (errDeleteProduct) {
    res.status(400).json({ errDeleteProduct });
    return null;
  }

  res.status(200).json(status);
  return null;
});

// 3.- Add Product http://localhost:3500/api/product
router.post('/product', async (req, res) => {
  const { productName, price, mandatory } = req.body;
  // Query to add product
  const { product, errAddProduct } = await addProduct(
    productName,
    price,
    mandatory
  );
  if (errAddProduct) {
    res.status(400).json({ errAddProduct });
    return null;
  }

  res.status(200).json({ product, status: 200 });
  return null;
});

// 4.- Update Product http://localhost:3500/api/updProduct
router.post('/updProduct', async (req, res) => {
  const { idProduct, productName, price, mandatory } = req.body;
  // Query to add grade
  const { product, errUpdProduct } = await updGrade(
    idProduct,
    productName,
    price,
    mandatory
  );
  if (errUpdProduct) {
    res.status(400).json({ errUpdProduct });
    return null;
  }

  res.status(200).json({ product, status: 200 });
  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get Products
const getProducts = async () => {
  const products = {};
  const query = `SELECT idProduct, productName, price, mandatory FROM products;`;

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

// Query to delete product
const deleteProduct = id => {
  const query = `DELETE FROM products WHERE products.idProduct = ${id};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errDeleteProduct => {
      if (!errDeleteProduct) {
        resolve({ status: 200 });
      } else {
        resolve({ errDeleteProduct });
      }
    });
  });
};

// Query to add product
const addProduct = (newProductName, newPrice, newMandatory) => {
  const query = `INSERT INTO products (productName, price, mandatory) VALUES ("${newProductName}", ${newPrice}, ${newMandatory});`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddProduct, rows) => {
      if (!errAddProduct) {
        const product = {
          idProduct: rows.insertId,
          productName: newProductName,
          price: newPrice,
          mandatory: newMandatory
        };
        resolve({ product });
      } else {
        resolve({ errAddProduct });
      }
    });
  });
};

// Query to update product
const updGrade = async (idProduct, productName, price, mandatory) => {
  const query = `UPDATE products SET productName = "${productName}", price = ${price}, mandatory = ${mandatory} where idProduct = ${idProduct};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdProduct => {
      if (!errUpdProduct) {
        const product = { idProduct, productName, price, mandatory };
        resolve({ product });
      } else {
        resolve({ errUpdProduct });
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
