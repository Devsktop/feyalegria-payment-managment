/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const mysql = require('mysql');
const path = require('path');

//Rutas o Endpoints

// 1.- Add Represantives http://localhost:3500/api/represantives
router.post('/represantives', (req, res) => {
  const { names, lastnames, dni, balance, phone, email } = req.body;
  const query = ` INSERT INTO represantives (names, lastnames, dni, balance, phone, email) VALUES (?, ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [ names, lastnames, dni, balance, phone, email ],
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

// 2.-Select Represantives http://localhost:3500/api/represantives
router.get('/represantives', (req, res) => {
  mysqlConnection.query('SELECT * from represantives', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// 3.-Delete Represantives ---> http://localhost:3500/api/represantives
router.delete('/represantives', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM represantives WHERE represantives.idrepresentative =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

//4.- Update Represantives---->http://localhost:3500/api/updRepresantives
router.post('/updRepresantives', (req, res) => {
  const { names, lastnames, dni, balance, phone, email } = req.body;
  const query = ` CALL updRepresantives(?, ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [names, lastnames, dni, balance, phone, email],
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
