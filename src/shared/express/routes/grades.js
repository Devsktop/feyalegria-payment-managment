const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// // 1.- Get grades http://localhost:3500/api/grades
router.get('/grades', async (req, res) => {
  // Query to get grades
  const { grades, errGrades } = await getGrades();
  if (errGrades) {
    res.status(400).json({ errGrades });
    return null;
  }

  res.status(200).json(grades);
  return res;
});

// // 2.- Get grade by id http://localhost:3500/api/grade/[id]
router.get('/grade/:idGrade', async (req, res) => {
  const { idGrade } = req.params;
  // Query to get grade by id
  const { grade, errGrade } = await getGrade(idGrade);
  if (errGrade) {
    res.status(400).json({ errGrade });
    return null;
  }

  res.status(200).json(grade);
  return res;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get grades
const getGrades = () => {
  const grades = {};
  const query = `SELECT grades.idGrade, grades.scholarYear AS grade, COUNT(sections.idGrade) AS sections FROM grades, sections WHERE sections.idGrade = grades.idGrade GROUP BY grades.idGrade`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrades, rows) => {
      if (!errGrades) {
        const peopleByGrade = await getPeopleGrade();
        rows.forEach(row => {
          grades[row.idGrade] = { ...row, ...peopleByGrade[row.idGrade] };
        });
        resolve(grades);
      } else {
        resolve({ errGrades });
      }
    });
  });
};

// Query to get grades's students
const getPeopleGrade = async () => {
  const peopleByGrade = {};
  const query = `SELECT grades.idGrade, COUNT(students.idStudent) AS sectionStudents, COUNT(DISTINCT students.idRepresentative) AS representatives FROM grades LEFT JOIN students ON students.idGrade = grades.idGrade GROUP BY grades.idGrade`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errStudents, rows) => {
      if (!errStudents) {
        rows.forEach(row => {
          peopleByGrade[row.idGrade] = { ...row };
        });
        resolve(peopleByGrade);
      } else {
        resolve({ errStudents });
      }
    });
  });
};

// Query to get grade by id
const getGrade = async idGrade => {
  const query = `SELECT 
   scholarYear,
   section,
   capacity,
   idSection
  FROM grades, sections
  WHERE ${idGrade} = sections.idGrade;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrade, rows) => {
      if (!errGrade) {
        const { scholarYear, section, capacity, idSection } = rows[0];
        const grade = {
          grade: scholarYear,
          section,
          capacity,
          idSection
        };
        resolve({ grade });
      } else {
        resolve({ errGrade });
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
