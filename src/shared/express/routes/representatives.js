const express = require('express');

const router = express.Router();
const mysqlConnection = require('../database');

// Rutas o Endpoints
// // 1.- Get representative http://localhost:3500/api/representatives/[idRepresentative]
router.get('/representatives/:idRepresentative', async (req, res) => {
  const { idRepresentative } = req.params;
  // Query to get representative
  const { representative, errRepresentative } = await getRepresentative(
    idRepresentative
  );
  if (errRepresentative) {
    res.status(400).json({ errRepresentative });
    return null;
  }

  res.status(200).json(representative);
  return res;
});

module.exports = router;

// Query to get representative
const getRepresentative = async idRepresentative => {
  const query = `SELECT CONCAT(names, ' ', lastnames) AS name, dni, phone, email, balance, monthsToPay AS paidMonths FROM representatives WHERE ${idRepresentative} = idRepresentative;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errRepresentative, rows) => {
      if (!errRepresentative) {
        const { name, dni, phone, email, balance, paidMonths } = rows[0];
        // Function to get represantive's students
        const { students, errStudents } = await getStudents(idRepresentative);
        const representative = {
          name,
          dni,
          phone,
          email,
          balance,
          paidMonths,
          students
        };
        resolve({ representative });
      } else {
        resolve({ errRepresentative });
      }
    });
  });
};

// Query to get representative students
const getStudents = async idRepresentative => {
  const students = {};
  const query = `SELECT idStudent ,CONCAT(students.names, ' ', students.lastnames) AS name, students.dni, relationship FROM representatives, students WHERE ${idRepresentative} = representatives.idRepresentative AND students.idRepresentative = representatives.idRepresentative;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errStudent, rows) => {
      if (!errStudent) {
        rows.forEach(row => {
          students[row.idStudent] = { ...row };
        });
        resolve({ students });
      } else {
        resolve({ errStudent });
      }
    });
  });
};

// // 1.- Add Represantives http://localhost:3500/api/represantives
// router.post('/represantives', (req, res) => {
//   const { names, lastnames, dni, balance, phone, email } = req.body;
//   const query = ` INSERT INTO represantives (names, lastnames, dni, balance, phone, email) VALUES (?, ?, ?, ?, ?, ?);
//      `;

//   mysqlConnection.query(
//     query,
//     [names, lastnames, dni, balance, phone, email],
//     (err, rows) => {
//       if (!err) {
//         res.json({
//           status: 'ok',
//           id: rows.insertId
//         });
//       } else {
//         res.json({
//           status: 'error',
//           err
//         });
//       }
//     }
//   );
// });

// // 2.-Select Represantives http://localhost:3500/api/represantives
// router.get('/represantives', (req, res) => {
//   mysqlConnection.query('SELECT * from represantives', (err, rows, fields) => {
//     if (!err) {
//       res.json(rows);
//     } else {
//       console.log(err);
//     }
//   });
// });

// // 3.-Delete Represantives ---> http://localhost:3500/api/represantives
// router.delete('/represantives', (req, res) => {
//   const { id } = req.body;
//   const query = `  DELETE FROM represantives WHERE represantives.idrepresentative =(?);
//      `;

//   mysqlConnection.query(query, [id], (err, rows, fields) => {
//     if (!err) {
//       res.json({ status: 'ok' });
//     } else {
//       res.json({ status: 'error' });
//     }
//   });
// });

// // 4.- Update Represantives---->http://localhost:3500/api/updRepresantives
// router.post('/updRepresantives', (req, res) => {
//   const { names, lastnames, dni, balance, phone, email } = req.body;
//   const query = ` CALL updRepresantives(?, ?, ?, ?, ?, ?);
//      `;

//   mysqlConnection.query(
//     query,
//     [names, lastnames, dni, balance, phone, email],
//     (err, rows, fields) => {
//       if (!err) {
//         res.json({
//           status: 'ok'
//         });
//       } else {
//         res.json({
//           status: 'error',
//           err
//         });
//       }
//     }
//   );
// });
