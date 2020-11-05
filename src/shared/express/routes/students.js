const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints

// 1.-Select 10 Solvent & 10 Insolvent Students http://localhost:3500/api/students
router.get('/students', (req, res) => {
  const students = {};
  let joinedStudents;
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
  query = 'SELECT COUNT(idStudent) AS joinedStudents from students';
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      joinedStudents = rows[0].joinedStudents;
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
        joinedStudents,
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

// 2.-Select Students By Section http://localhost:3500/api/students/:section
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

// 4.- Post add student http://localhost:3500/api/student
router.post('/student', async (req, res) => {
  const {
    names,
    lastNames,
    dni,
    phone,
    email,
    balance,
    paidMonths,
    inscription,
    idDniType
  } = req.body;
  // Query to add student
  const { student, errAddStudent } = await addStudent(
    names,
    lastNames,
    dni,
    phone,
    email,
    balance,
    paidMonths,
    inscription,
    idDniType
  );
  if (errAddStudent) {
    res.status(400).json({ errAddStudent });
    return null;
  }

  res.status(200).json({ student, status: 200 });
  return null;
});

// Query to add student
const addStudent = (
  names,
  lastNames,
  dni,
  birthDate,
  relationship,
  state,
  balance,
  inscription,
  paidMonths,
  idRepresentative,
  idDniType,
  idSection,
  idGrade
) => {
  const query = `INSERT INTO students(names, lastnames, dni, birthDate, relationship, state, balance, inscription, paidMonths, idRepresentative, idDniType, idSection, idGrade) 
  VALUES
  ("${names}", 
  "${lastNames}", 
  "${dni}", 
  "${birthDate}", 
  "${relationship}",
  "${state}", 
  ${balance},
  ${inscription},
  ${paidMonths},
  ${idRepresentative}, 
  ${idDniType},
  ${idSection},
  ${idGrade});`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddStudent, rows) => {
      if (!errAddStudent) {
        const student = {
          idStudent: rows.insertId,
          names,
          lastNames,
          dni,
          birthDate,
          relationship,
          state,
          balance,
          inscription,
          paidMonths,
          idRepresentative,
          idDniType,
          idSection,
          idGrade
        };
        resolve({ student });
      } else {
        resolve({ errAddStudent });
      }
    });
  });
};

module.exports = router;
