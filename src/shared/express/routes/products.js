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
  // Query to update product
  const { product, errUpdProduct } = await updProduct(
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
  const query = `SELECT idProduct, productName, price, mandatory FROM products WHERE deleted = false;`;

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
  const query = `UPDATE products SET deleted = true where idProduct = ${id};`;

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
const updProduct = async (idProduct, productName, price, mandatory) => {
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

module.exports = router;
