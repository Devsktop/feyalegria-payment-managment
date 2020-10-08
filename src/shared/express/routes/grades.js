const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// // 1.- Get grades http://localhost:3500/api/grades
router.get('/grades', async (req, res) => {
  // Query to get representative
  const { grades, errGrades } = await getGrades();
  if (errGrades) {
    res.status(400).json({ errGrades });
    return null;
  }

  const { rows, errStudents } = await getStudents();
  if (errStudents) {
    res.status(400).json({ errStudents });
    return null;
  }

  res.status(200).json(grades);
  return res;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get grades
const getGrades = async () => {
  const grades = {};
  const query = `SELECT grades.idGrade, grades.scholarYear AS grade, COUNT(sections.idGrade) AS sections FROM grades, sections WHERE sections.idGrade = grades.idGrade GROUP BY grades.idGrade`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrades, rows) => {
      if (!errGrades) {
        rows.forEach(row => {
          grades[row.idGrade] = { ...row };
        });
        resolve({ grades });
      } else {
        resolve({ errGrades });
      }
    });
  });
};

// Query to get grades's students
const getStudents = async () => {
  const query = `SELECT grades.idGrade, COUNT(students.idStudent) AS sectionStudents FROM grades LEFT JOIN students ON students.idGrade = grades.idGrade GROUP BY grades.idGrade;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errStudents, rows) => {
      if (!errStudents) {
        rows.forEach(row => {
          const { idGrade, sectionStudents } = row;
          let students = sectionStudents;
        });
        resolve({});
      } else {
        resolve({ errStudents });
      }
    });
  });
};

// // 1.- Add Grades http://localhost:3500/api/grades
// router.post('/grades', (req, res) => {
//   const { scholarYear } = req.body;
//   const query = ` INSERT INTO grades (scholarYear) VALUES (?);
//      `;

//   mysqlConnection.query(query, [scholarYear], (err, rows) => {
//     if (!err) {
//       res.json({
//         status: 'ok',
//         id: rows.insertId
//       });
//     } else {
//       res.json({
//         status: 'error',
//         err
//       });
//     }
//   });
// });

// // 2.-Select Grades http://localhost:3500/api/grades
// router.get('/grades', (req, res) => {
//   mysqlConnection.query('SELECT * from grades', (err, rows, fields) => {
//     if (!err) {
//       res.json(rows);
//     } else {
//       console.log(err);
//     }
//   });
// });

// // 3.-Delete Grades ---> http://localhost:3500/api/grades
// router.delete('/grades', (req, res) => {
//   const { id } = req.body;
//   const query = `  DELETE FROM grades WHERE grades.idgrades  =(?);
//      `;

//   mysqlConnection.query(query, [id], (err, rows, fields) => {
//     if (!err) {
//       res.json({ status: 'ok' });
//     } else {
//       res.json({ status: 'error' });
//     }
//   });
// });

// //4.- Update Grades ---->http://localhost:3500/api/updGrades
// router.post('/updGrades', (req, res) => {
//   const { scholarYear } = req.body;
//   const query = ` CALL updGrades(?);
//      `;

//   mysqlConnection.query(query, [scholarYear], (err, rows, fields) => {
//     if (!err) {
//       res.json({
//         status: 'ok'
//       });
//     } else {
//       res.json({
//         status: 'error',
//         err
//       });
//     }
//   });
// });

module.exports = router;
