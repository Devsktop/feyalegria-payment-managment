/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const mysql = require('mysql');
const path = require('path');

//Rutas o Endpoints

// 1.- Add Grades http://localhost:3500/api/grades
router.post('/grades', (req, res) => {
  const { scholarYear } = req.body;
  const query = ` INSERT INTO grades (scholarYear) VALUES (?);
     `;

  mysqlConnection.query(
    query,
    [scholarYear],
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

// 2.-Select Grades http://localhost:3500/api/grades
router.get('/grades', (req, res) => {
  mysqlConnection.query('SELECT * from grades', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// 3.-Delete Grades ---> http://localhost:3500/api/grades
router.delete('/grades', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM grades WHERE grades.idgrades  =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

//4.- Update Grades ---->http://localhost:3500/api/updGrades
router.post('/updGrades', (req, res) => {
  const { scholarYear  } = req.body;
  const query = ` CALL updGrades(?);
     `;

  mysqlConnection.query(
    query,
    [scholarYear ],
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
