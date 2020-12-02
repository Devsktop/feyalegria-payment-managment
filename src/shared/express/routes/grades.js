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
  const {
    grade: { idGrade, scholarYear, gradesSections },
    deleted
  } = req.body;
  // Query to add grade
  const { grade, errUpdGrade } = await updGrade(
    idGrade,
    scholarYear,
    gradesSections,
    deleted
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
  console.log('hola');
  const grades = {};
  const query = `SELECT grades.idGrade, grades.scholarYear AS scholarYear, COUNT(sections.idGrade) AS sectionsNumber FROM grades LEFT JOIN sections ON sections.idGrade = grades.idGrade WHERE grades.deleted = false AND sections.deleted = false GROUP BY grades.idGrade;`;

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
  const query = `SELECT idSection, section, capacity, sections.idGrade FROM sections LEFT JOIN grades ON sections.idGrade = grades.idGrade WHERE sections.deleted = false;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrades, rows) => {
      if (!errGrades) {
        const peopleBySection = await getStudentsBySection();
        rows.forEach(row => {
          sections[row.idSection] = {
            ...row,
            ...peopleBySection[row.idSection]
          };
        });
        console.log(sections);
        resolve({ sections });
      } else {
        console.log(errGrades);
        resolve({ errGrades });
      }
    });
  });
};

// Query to get students by section
const getStudentsBySection = () => {
  const query = `SELECT sections.idSection, COUNT(students.idStudent) AS sectionStudents, COUNT(DISTINCT students.idRepresentative) AS sectionRepresentatives FROM sections LEFT JOIN students ON students.idSection = sections.idSection GROUP BY sections.idSection;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGetStudentsBySection, rows) => {
      if (!errGetStudentsBySection) {
        const { sectionStudents } = rows[0];
        const peopleBySection = { sectionStudents };
        resolve({ peopleBySection });
      } else {
        resolve({ errGetStudentsBySection });
      }
    });
  });
};

// Query to get grades's students
const getPeopleGrade = () => {
  const peopleByGrade = {};
  const query = `SELECT grades.idGrade, COUNT(students.idStudent) AS gradeStudents, COUNT(DISTINCT students.idRepresentative) AS gradeRepresentatives FROM grades LEFT JOIN students ON students.idGrade = grades.idGrade GROUP BY grades.idGrade`;

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
const getGrade = idGrade => {
  const query = `SELECT scholarYear FROM grades WHERE ${idGrade} = idGrade;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGrade, rows) => {
      if (!errGrade) {
        const { scholarYear } = rows[0];
        const { sections } = await getGradeSections(idGrade);
        const grade = {
          scholarYear,
          sections
        };
        resolve({ grade });
      } else {
        resolve({ errGrade });
      }
    });
  });
};

// Query to get grade's sections
const getGradeSections = idGrade => {
  const sections = {};
  const query = `SELECT 
  section,
  capacity,
  idSection,
  sections.idGrade
  FROM sections
  INNER JOIN grades ON sections.idGrade = ${idGrade}
  WHERE sections.deleted = false 
  GROUP BY sections.idSection;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGradeSections, rows) => {
      if (!errGradeSections) {
        rows.forEach(row => {
          sections[row.idSection] = { ...row };
        });
        resolve({ sections });
      } else {
        resolve({ errGradeSections });
      }
    });
  });
};

// Query to delete grade
const deleteGrade = async idGrade => {
  const { sections } = await getGradeSections(idGrade);
  const sectionsKeys = Object.keys(sections);

  if (sectionsKeys.length > 0) {
    return new Promise(resolve => {
      resolve({ status: 1451 });
    });
  }
  const query = `UPDATE grades SET deleted = true WHERE grades.idGrade = ${idGrade};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errDeleteGrade => {
      if (!errDeleteGrade) {
        resolve({ status: 200 });
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
              sectionsNumber: Object.keys(gradesSections).length,
              gradeStudents: 0,
              gradeRepresentatives: 0
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
const addSection = (idGrade, Gradesection) => {
  const { section, capacity } = Gradesection;
  const query = `INSERT INTO sections (section, capacity, idGrade) VALUES ("${section}", ${capacity}, ${idGrade});`;
  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddSection, rows) => {
      if (!errAddSection) {
        const seccion = {
          idSection: rows.insertId,
          section,
          capacity,
          idGrade
        };
        console.log(seccion);
        resolve({ seccion });
      } else {
        resolve({ errAddSection });
      }
    });
  });
};

// Query to update grade
const updGrade = (idGrade, scholarYear, gradesSections, deleted) => {
  const query = `UPDATE grades SET scholarYear = "${scholarYear}" where grades.idGrade = ${idGrade};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async errUpdGrade => {
      if (!errUpdGrade) {
        // Check if deleted object is empty
        if (deleted.length > 0) {
          deleted.forEach(async id => {
            // Query to delete section
            await deleteSection(id);
          });
        }

        // Get array of keys of gradesSections
        const gradesSectionsKeys = Object.keys(gradesSections);

        // Iterate in gradesSections with each key
        gradesSectionsKeys.forEach(async sectionKey => {
          console.log(sectionKey);
          // Verify if idSection is positive or negative ('+ = Update', '- = Delete')
          if (gradesSections[sectionKey].idSection > 0) {
            // Query to update a section
            await updSection(gradesSections[sectionKey]);
          } else {
            // Query to insert a section
            await addSection(idGrade, gradesSections[sectionKey]);
          }
        });

        // Get new sections
        const { sections } = await getGradeSections(idGrade);
        const peopleByGrade = await getPeopleGrade();
        // Contruction of updated grade
        const grade = {
          idGrade,
          scholarYear,
          gradesSections: sections,
          sectionsNumber: Object.keys(gradesSections).length,
          gradeStudents: peopleByGrade[idGrade].gradeStudents,
          gradeRepresentatives: peopleByGrade[idGrade].gradeRepresentatives
        };
        resolve({ grade });
      } else {
        resolve({ errUpdGrade });
      }
    });
  });
};

// Query to update sections
const updSection = Gradesection => {
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

// Query to delete section
const deleteSection = async id => {
  console.log(id);
  const query = `UPDATE sections SET deleted = true WHERE idSection = ${id}`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errDeleteSection => {
      if (!errDeleteSection) {
        resolve({ status: 200 });
      } else {
        resolve({ errDeleteSection });
      }
    });
  });
};

module.exports = router;
