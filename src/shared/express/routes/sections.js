const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Query to get Sections - call to iniial props
const getSections = async () => {
  const sections = {};

  const query = `SELECT scholarYear AS grade, section, COUNT(students.idStudent) AS studentsCant, COUNT(DISTINCT(idRepresentative)) AS representativeCant, sections.idGrade, sections.idSection FROM sections, grades, students WHERE students.idSection = sections.idSection AND students.idGrade = grades.idGrade GROUP BY sections.idSection;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetSections, rows) => {
      if (!errGetSections) {
        rows.forEach(row => {
          sections[row.idSection] = { ...row };
        });
        resolve({ sections });
      } else {
        resolve({ errGetSections });
      }
    });
  });
};

// Rutas o Endpoints
// 1.-Select Section http://localhost:3500/api/sections
router.get('/sections', async (req, res) => {
  // Query to get Sections
  const { sections, errGetSections } = await getSections();

  if (errGetSections) {
    res.status(400).json({ errGetSections });
    return null;
  }
  console.log(sections);

  res.status(200).json(sections);
  return res;
});

module.exports = router;
