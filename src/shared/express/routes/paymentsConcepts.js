/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const mysql = require('mysql');
const path = require('path');

//Rutas o Endpoints

// 1.- Add paymentsConcepts http://localhost:3500/api/paymentsConcepts
router.post('/paymentsConcepts', (req, res) => {
  const { name, price } = req.body;
  const query = ` INSERT INTO paymentsconcepts (name, price) VALUES (?, ?);
     `;

  mysqlConnection.query(
    query,
    [name, price],
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

// 2.-Select paymentsConcepts http://localhost:3500/api/paymentsConcepts
router.get('/paymentsConcepts', (req, res) => {
  mysqlConnection.query('SELECT * from paymentsconcepts', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// 3.-Delete paymentsConcepts ---> http://localhost:3500/api/paymentsConcepts
router.delete('/paymentsConcepts', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM paymentsconcepts WHERE paymentsconcepts.idpaymentsConcepts   =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

//4.- Update paymentsConcepts ---->http://localhost:3500/api/updPaymentsConcepts
router.post('/updPaymentsConcepts', (req, res) => {
  const { name, price } = req.body;
  const query = ` CALL updPaymentsConcepts(?, ?);
     `;

  mysqlConnection.query(
    query,
    [name, price],
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
