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

  mysqlConnection.query(query, [id], err => {
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
    err => {
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
  let insolventStudents;
  let solventStudents;

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

  // Query to get Students solventStudents
  query =
    'SELECT COUNT(idStudent) AS solventStudents from students where inscription = true AND balance >= 0';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      solventStudents = rows[0].solventStudents;
    } else {
      res.status(404).json({
        err
      });
    }
  });

  // Query to get Students insolventStudents
  query =
    'SELECT COUNT(idStudent) AS insolventStudents from students where balance < 0';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      insolventStudents = rows[0].insolventStudents;
      res.status(200).json({
        students,
        totalStudents,
        solventStudents,
        insolventStudents
      });
    } else {
      res.status(404).json({
        err
      });
    }
  });
});

// 1.-Select Students By Section http://localhost:3500/api/students/:section
router.get('/students/:section', (req, res) => {
  const { section } = req.params;
  const students = {};

  // Query to select students by section
  const query = `SELECT idStudent, CONCAT(students.names, " ", students.lastnames) AS name, students.dni, birthdate, CONCAT(representatives.names, " ", representatives.lastnames) AS representative, students.balance from students, representatives WHERE representatives.idRepresentative = students.idRepresentative AND students.idSection = ${section};`;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      rows.forEach(row => {
        if (row.balance >= 0) {
          students[row.idStudent] = { ...row, solvent: true };
        } else {
          students[row.idStudent] = { ...row, solvent: false };
        }
      });
      res.status(200).json({
        students
      });
    } else {
      res.status(404).json({
        err
      });
    }
  });
});

module.exports = router;
