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
  return null;
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
  return null;
});

// 3.-Delete Grade ---> http://localhost:3500/api/grade
router.delete('/grade', async (req, res) => {
  const { id } = req.body;
  // Query to delete grade
  const { status, errDeleteGrade } = await deleteGrade(id);
  if (errDeleteGrade) {
    res.status(400).json({ errDeleteGrade });
    return null;
  }

  res.status(200).json(status);
  return null;
});

// 4.- Add Grade http://localhost:3500/api/grade
router.post('/grade', async (req, res) => {
  const { scholarYear, gradesSections } = req.body;
  // Query to add grade
  const { grade, errAddGrade } = await addGrade(scholarYear, gradesSections);
  if (errAddGrade) {
    res.status(400).json({ errAddGrade });
    return null;
  }

  res.status(200).json({ grade, status: 200 });
  return null;
});

// 5.- Update Grade http://localhost:3500/api/updGrade
router.post('/updGrade', async (req, res) => {
  const { idGrade, scholarYear, gradesSections } = req.body;
  // Query to add grade
  const { grade, errUpdGrade } = await updGrade(
    idGrade,
    scholarYear,
    gradesSections
  );
  if (errUpdGrade) {
    res.status(400).json({ errUpdGrade });
    return null;
  }

  res.status(200).json({ grade, status: 200 });
  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get grades
const getGrades = () => {
  const grades = {};
  const query = `SELECT grades.idGrade, grades.scholarYear AS scholarYear, COUNT(sections.idGrade) AS sectionsNumber FROM grades LEFT JOIN sections ON sections.idGrade = grades.idGrade GROUP BY grades.idGrade;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrades, rows) => {
      if (!errGrades) {
        const { sections } = await getSections();
        const peopleByGrade = await getPeopleGrade();
        rows.forEach(row => {
          const gradesSections = {};
          const sectionsKeys = Object.keys(sections);

          // For each rate filter those sections that belong to each grade
          sectionsKeys.forEach(key => {
            if (sections[key].idGrade === row.idGrade)
              gradesSections[key] = { ...sections[key] };
          });

          grades[row.idGrade] = {
            ...row,
            gradesSections,
            ...peopleByGrade[row.idGrade]
          };
        });
        resolve({ grades });
      } else {
        resolve({ errGrades });
      }
    });
  });
};

// Query to get sections
const getSections = () => {
  const sections = {};
  const query = `SELECT idSection, section, capacity, sections.idGrade FROM sections LEFT JOIN grades ON sections.idGrade = grades.idGrade;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrades, rows) => {
      if (!errGrades) {
        rows.forEach(row => {
          sections[row.idSection] = { ...row };
        });
<<<<<<< HEAD
        resolve({ sections });
=======
        resolve({ grades });
>>>>>>> 98a7d80b5879c406b0cd48993fec467b82c395ce
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
          scholarYear,
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

// Query to delete grade
const deleteGrade = async id => {
  const query = `DELETE FROM grades WHERE grades.idGrade = ${id};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errDeleteGrade => {
      if (!errDeleteGrade) {
        resolve({ status: 200 });
      } else if (errDeleteGrade.errno === 1451) {
        resolve({ status: 1451 });
      } else {
        resolve({ errDeleteGrade });
      }
    });
  });
};

// Query to add grade
const addGrade = (scholarYear, gradesSections) => {
  let counter = 0;
  const gradeSections = {};
  const query = `INSERT INTO grades (scholarYear) VALUES ("${scholarYear}");`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddGrade, rows) => {
      if (!errAddGrade) {
        Object.keys(gradesSections).forEach(async sectionKey => {
          const { seccion } = await addSection(
            rows.insertId,
            gradesSections[sectionKey]
          );
          gradeSections[seccion.idSection] = { ...seccion };
          counter += 1;
          if (counter === Object.keys(gradesSections).length) {
            const grade = {
              idGrade: rows.insertId,
              scholarYear,
              gradesSections: gradeSections,
              sectionsNumber: Object.keys(gradesSections).length
            };
            resolve({ grade });
          }
        });
      } else {
        resolve({ errAddGrade });
      }
    });
  });
};

// Query to add section
const addSection = async (id, Gradesection) => {
  const { section, capacity } = Gradesection;
  const query = `INSERT INTO sections (section, capacity, idGrade) VALUES ("${section}", ${capacity}, ${id});`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddSection, rows) => {
      if (!errAddSection) {
        const seccion = {
          idSection: rows.insertId,
          section,
          capacity,
          idGrade: id
        };
        resolve({ seccion });
      } else {
        resolve({ errAddSection });
      }
    });
  });
};

// Query to update grade
const updGrade = async (idGrade, scholarYear, gradesSections) => {
  let counter = 0;
  const gradeSections = {};
  const query = `UPDATE grades SET scholarYear = "${scholarYear}" where grades.idGrade = ${idGrade};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdGrade => {
      if (!errUpdGrade) {
        Object.keys(gradesSections).forEach(async sectionKey => {
          const { seccion } = await updSection(gradesSections[sectionKey]);
          gradeSections[seccion.idSection] = { ...seccion };
          counter += 1;
          if (counter === Object.keys(gradesSections).length) {
            const grade = {
              idGrade,
              scholarYear,
              gradesSections: gradeSections,
              sectionsNumber: Object.keys(gradesSections).length,
              sectionStudents: 0,
              representatives: 0
            };
            resolve({ grade });
          }
        });
      } else {
        resolve({ errUpdGrade });
      }
    });
  });
};

// Query to update sections
const updSection = async Gradesection => {
  const { idSection, section, capacity } = Gradesection;
  const query = `UPDATE sections SET section = "${section}", capacity = ${capacity} where sections.idSection = ${idSection};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdSection => {
      if (!errUpdSection) {
        const seccion = {
          idSection,
          section,
          capacity
        };
        resolve({ seccion });
      } else {
        resolve({ errUpdSection });
      }
    });
  });
};

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
