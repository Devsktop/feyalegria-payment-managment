const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints

// 1.- Add Students http://localhost:3500/api/students
router.post('/students', (req, res) => {
  const {
    names,
    lastnames,
    dni,
    birthDate,
    relationship,
    state,
    blood,
    weight,
    size,
    email,
    phone,
    socialMedia
  } = req.body;
  const query = ` INSERT INTO students (names, lastnames, dni, birthDate, relationship, state, blood, weight, size, email, phone, socialMedia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [
      names,
      lastnames,
      dni,
      birthDate,
      relationship,
      state,
      blood,
      weight,
      size,
      email,
      phone,
      socialMedia
    ],
    (err, rows) => {
      if (!err) {
        res.status(200).json({
          id: rows.insertId
        });
      } else if (err.errno === 1062) {
        // Handle Duplicate entry error
        res.status(409).json({ err });
      } else {
        res.json({
          status: 'error',
          err
        });
      }
    }
  );
});

// 2.-Select Students http://localhost:3500/api/students
router.get('/students', (req, res) => {
  mysqlConnection.query('SELECT * from students', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// 3.-Delete Student ---> http://localhost:3500/api/students
router.delete('/students', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM students WHERE students.Id_students =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

// 4.- Update Student---->http://localhost:3500/api/updStudent
router.post('/updStudent', (req, res) => {
  const {
    names,
    lastnames,
    dni,
    birthDate,
    relationship,
    state,
    blood,
    weight,
    size,
    email,
    phone,
    socialMedia
  } = req.body;
  const query = ` CALL updStudent(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [
      names,
      lastnames,
      dni,
      birthDate,
      relationship,
      state,
      blood,
      weight,
      size,
      email,
      phone,
      socialMedia
    ],
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
