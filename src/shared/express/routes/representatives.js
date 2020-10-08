const express = require('express');

const router = express.Router();
const mysqlConnection = require('../database');

// Rutas o Endpoints
// // 1.- Get representatives http://localhost:3500/api/representatives/[section] - ?pag=number
router.get('/representatives/:section', async (req, res) => {
  const { section } = req.params;
  const { pag, pattern } = req.query;

  console.log(pag);
  // Query to get representative
  const { representatives, errRepresentatives } = await getRepresentatives(
    section,
    pag,
    pattern
  );
  if (errRepresentatives) {
    res.status(400).json({ errRepresentatives });
    return null;
  }

  res.status(200).json(representatives);
  return res;
});

// 2.- Get representative http://localhost:3500/api/representatives/[idRepresentative]
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

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get representatives from section
const getRepresentatives = async (section, pag, pattern) => {
  const pagIndex = pag * 10;
  const representatives = {};
  const patternQuery = `AND representatives.names LIKE "%${pattern}%" OR representatives.lastnames LIKE "%${pattern}%" OR representatives.dni LIKE "%${pattern}%" OR representatives.phone LIKE "%${pattern}%" OR representatives.email LIKE "%${pattern}%" OR representatives.balance LIKE "%${pattern}%" OR representatives.idRepresentative LIKE "%${pattern}%"`;
  const query = `SELECT DISTINCT 
  CONCAT(representatives.names, ' ', representatives.lastnames) AS name, 
  representatives.dni, 
  representatives.phone, 
  representatives.email, 
  representatives.balance, 
  representatives.idRepresentative
  FROM representatives, students 
  WHERE ${section} = students.idSection 
  AND students.idRepresentative = representatives.idRepresentative
  ${pattern ? patternQuery : ''}
  ORDER BY representatives.names
  LIMIT ${pagIndex} , 10;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errRepresentatives, rows) => {
      if (!errRepresentatives) {
        rows.forEach(row => {
          representatives[row.idRepresentative] = { ...row };
        });
        console.log(representatives);
        resolve({ representatives });
      } else {
        resolve({ errRepresentatives });
      }
    });
  });
};

// Query to get representative
const getRepresentative = async idRepresentative => {
  const query = `SELECT 
  CONCAT(names, ' ', lastnames) AS name, 
  dni, 
  phone, 
  email, 
  balance, 
  monthsToPay AS paidMonths 
  FROM representatives 
  WHERE ${idRepresentative} = idRepresentative;`;

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
  const query = `SELECT idStudent,
  CONCAT(students.names, ' ', students.lastnames) AS name,
  students.dni,
  relationship,
  scholarYear AS grade
  FROM students
  INNER JOIN representatives ON ${idRepresentative} = representatives.idRepresentative AND students.idRepresentative = representatives.idRepresentative 
  INNER JOIN grades ON students.idGrade = grades.idGrade;`;

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
