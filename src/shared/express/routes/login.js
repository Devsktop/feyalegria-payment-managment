
const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints

// 2.-Select User http://localhost:3500/api/login
router.post('/login', (req, res) => {
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
