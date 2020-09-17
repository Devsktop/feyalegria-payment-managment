/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const mysql = require('mysql');
const path = require('path');

//Rutas o Endpoints

// 1.- Add Products http://localhost:3500/api/products
router.post('/products', (req, res) => {
  const { product, price } = req.body;
  const query = ` INSERT INTO products (product, price) VALUES (?, ?);
     `;

  mysqlConnection.query(
    query,
    [ product, price  ],
    (err, rows) => {
      if (!err) {
        res.json({
          status: 'ok',
          id: rows.insertId
        });
      } else {
        res.json({
          status: 'error',
          err
        });
      }
    }
  );
});

// 2.-Select Products http://localhost:3500/api/products
router.get('/products', (req, res) => {
  mysqlConnection.query('SELECT * from products', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// 3.-Delete Products ---> http://localhost:3500/api/products
router.delete('/products', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM products WHERE products.idproducts =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

//4.- Update Products---->http://localhost:3500/api/updProducts
router.post('/updProducts', (req, res) => {
  const { product, price } = req.body;
  const query = ` CALL updProducts(?, ?);
     `;

  mysqlConnection.query(
    query,
    [product, price],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 'ok'
        });
      } else {
        res.json({
          status: 'error',
          err
        });
      }
    }
  );
});

module.exports = router;
