const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// // 1.- Get representatives http://localhost:3500/api/representatives/[section] - ?pag=number - ?pattern
router.get('/representatives/:section', async (req, res) => {
  const { section } = req.params;
  const { pag, pattern } = req.query;

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
  return null;
});

// 2.- Get representative http://localhost:3500/api/representatives/[idRepresentative]
router.get('/representatives/:idRepresentative', async (req, res) => {
  const { idRepresentative } = req.params;
  // Query to get representative
  const { representative, status, errRepresentative } = await getRepresentative(
    idRepresentative
  );
  if (errRepresentative) {
    res.status(400).json({ errRepresentative });
    return null;
  }

  res.status(200).json({ representative, status });
  return null;
});

// 3.- Get representative by Dni http://localhost:3500/api/representativesbydni/[dni]
router.get('/representativesbydni/:dni', async (req, res) => {
  const { dni } = req.params;
  // Query to get representative
  const {
    representative,
    status,
    errRepresentative
  } = await getRepresentativeByDni(dni);
  if (errRepresentative) {
    res.status(400).json({ errRepresentative });
    return null;
  }

  res.status(200).json({ representative, status });
  return null;
});

// 4.- Post add representative http://localhost:3500/api/representative
router.post('/representative', async (req, res) => {
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
  // Query to add representative
  const { representative, errAddRepresentative } = await addRepresentative(
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
  if (errAddRepresentative) {
    res.status(400).json({ errAddRepresentative });
    return null;
  }

  res.status(200).json({ representative, status: 200 });
  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get representatives from section
const getRepresentatives = async (section, pag, pattern) => {
  const pagIndex = pag * 10;
  const representatives = {};
  const patternQuery = `AND representatives.names LIKE "%${pattern}%" OR representatives.lastnames LIKE "%${pattern}%" OR representatives.dni LIKE "%${pattern}%" OR representatives.phone LIKE "%${pattern}%" OR representatives.email LIKE "%${pattern}%" OR representatives.balance LIKE "%${pattern}%" OR representatives.idRepresentative LIKE "%${pattern}%"`;
  const query = `SELECT DISTINCT 
  representatives.names,
  representatives.lastnames AS lastNames, 
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
  paidMonths 
  FROM representatives 
  WHERE ${idRepresentative} = idRepresentative;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errRepresentative, rows) => {
      if (!errRepresentative) {
        const { name, dni, phone, email, balance, paidMonths } = rows[0];
        // Function to get represantive's students
        const { students } = await getStudents(idRepresentative, true);
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
const getStudents = async (idRepresentative, inscription) => {
  const students = {};
  const query = `SELECT idStudent,
  CONCAT(students.names, ' ', students.lastnames) AS name,
  students.dni,
  relationship,
  scholarYear AS grade,
  section
  FROM students
  INNER JOIN representatives ON ${idRepresentative} = representatives.idRepresentative AND students.idRepresentative = representatives.idRepresentative 
  INNER JOIN grades ON students.idGrade = grades.idGrade
  INNER JOIN sections ON students.idSection = sections.idSection
  WHERE students.inscription = ${inscription}`;

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

// Query to get representative by dni
const getRepresentativeByDni = async representativeDni => {
  const query = `SELECT
  idRepresentative, 
  names,
  lastNames,
  dni,
  idDniType, 
  phone, 
  email, 
  balance, 
  paidMonths,
  inscription 
  FROM representatives 
  WHERE ${representativeDni} = dni AND deleted = false;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errRepresentative, rows) => {
      if (!errRepresentative) {
        if (rows.length === 1) {
          const {
            idRepresentative,
            names,
            lastNames,
            dni,
            idDniType,
            phone,
            email,
            balance,
            paidMonths,
            inscription
          } = rows[0];

          const { students } = await getStudents(idRepresentative, false);
          const representative = {
            idRepresentative,
            names,
            lastNames,
            dni,
            idDniType,
            phone,
            email,
            balance,
            paidMonths,
            students,
            inscription
          };
          resolve({ representative, status: 200 });
        } else {
          resolve({ status: 404 });
        }
      } else {
        resolve({ errRepresentative });
      }
    });
  });
};

// Query to add representative
const addRepresentative = (
  names,
  lastNames,
  dni,
  phone,
  email,
  balance,
  paidMonths,
  inscription,
  idDniType
) => {
  const query = `INSERT INTO representatives(names, lastNames, dni, phone, email, balance, paidMonths, inscription, idDniType) 
  VALUES 
  ("${names}", 
  "${lastNames}", 
  "${dni}", 
  "${phone}", 
  "${email}", 
  ${balance},
  ${paidMonths}, 
  ${inscription}, 
  ${idDniType});`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddRepresentative, rows) => {
      if (!errAddRepresentative) {
        const representative = {
          idRepresentative: rows.insertId,
          names,
          lastNames,
          dni,
          phone,
          email,
          balance,
          paidMonths,
          inscription,
          idDniType
        };
        resolve({ representative });
      } else {
        resolve({ errAddRepresentative });
      }
    });
  });
};

module.exports = router;
