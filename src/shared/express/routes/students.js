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

// 1.-Select 10 Solvent & 10 Insolvent Students http://localhost:3500/api/students
router.get('/students', (req, res) => {
  const students = {};
  let totalStudents;
  let insolventTotal;
  let solventTotal;

  // Query to select 10 Solvent Students
  let query =
    'SELECT idStudent, CONCAT(students.names, " ", students.lastnames) AS name, students.dni, birthdate, CONCAT(representatives.names, " ", representatives.lastnames) AS representative, students.balance from students, representatives where representatives.idRepresentative = students.idRepresentative AND students.inscription = true AND students.balance >= 0 LIMIT 10;';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      rows.forEach(row => {
        students[row.idStudent] = { ...row, solvent: true };
      });
    } else {
      res.status(404).json({
        err
      });
    }
  });

  // Query to select 10 Insolvent Students
  query =
    'SELECT idStudent, CONCAT(students.names, " ", students.lastnames) AS name, students.dni, birthdate, CONCAT(representatives.names, " ", representatives.lastnames) AS representative, students.balance from students, representatives where representatives.idRepresentative = students.idRepresentative AND students.inscription = true AND students.balance < 0 LIMIT 10;';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      rows.forEach(row => {
        students[row.idStudent] = { ...row, solvent: false };
      });
    } else {
      res.status(404).json({
        err
      });
    }
  });

  // Query to get students total
  query = 'SELECT COUNT(idStudent) AS totalStudents from students';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      totalStudents = rows[0].totalStudents;
    } else {
      res.status(404).json({
        err
      });
    }
  });

  // Query to get Students solventTotal
  query =
    'SELECT COUNT(idStudent) AS solventTotal from students where inscription = true AND balance >= 0';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      solventTotal = rows[0].solventTotal;
    } else {
      res.status(404).json({
        err
      });
    }
  });

  // Query to get Students insolventTotal
  query =
    'SELECT COUNT(idStudent) AS insolventTotal from students where balance < 0';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      insolventTotal = rows[0].insolventTotal;
      res.status(200).json({
        students,
        totalStudents,
        solventTotal,
        insolventTotal
      });
    } else {
      res.status(404).json({
        err
      });
    }
  });
});

module.exports = router;
