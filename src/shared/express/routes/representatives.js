// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.- Get representatives by section http://localhost:3500/api/representatives/[section] - ?pag=number - ?pattern
router.get('/representatives/:section', async (req, res) => {
  const { section } = req.params;
  const { pag, pattern } = req.query;

  // Query to get representatives by section
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
router.get('/representativebyid/:idRepresentative', async (req, res) => {
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
    console.log(errRepresentative);
    res.status(400).json(errRepresentative);
    return null;
  }

  res.status(200).json({ representative, status });
  return null;
});

// 4.- Post add representative http://localhost:3500/api/representative
router.post('/representative', async (req, res) => {
  const { names, lastNames, dni, phone, email, balance, idDniType } = req.body;
  // Query to add representative
  const { representative, errAddRepresentative } = await addRepresentative(
    names,
    lastNames,
    dni,
    phone,
    email,
    balance,
    idDniType
  );
  if (errAddRepresentative) {
    res.status(400).json(errAddRepresentative);
    return null;
  }

  res.status(200).json({ representative, status: 200 });
  return null;
});

// 5.- Update Representative http://localhost:3500/api/updRepresentative
router.post('/updRepresentative', async (req, res) => {
  const {
    idRepresentative,
    names,
    lastNames,
    idDniType,
    dni,
    phone,
    email
  } = req.body;
  // Query to update product
  const { representative, errUpdRepresentative } = await updRepresentative(
    idRepresentative,
    names,
    lastNames,
    idDniType,
    dni,
    phone,
    email
  );
  if (errUpdRepresentative) {
    res.status(400).json({ errUpdRepresentative });
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

// Query to get representative by id
const getRepresentative = async idRepresentative => {
  const query = `SELECT 
  names, 
  lastnames AS lastNames, 
  dni, 
  phone, 
  email, 
  balance,
  representatives.idDniType,
  letter AS dniType  
  FROM representatives, dnitype 
  WHERE ${idRepresentative} = idRepresentative AND representatives.idDniType = dnitype.idDniType;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errRepresentative, rows) => {
      if (!errRepresentative) {
        const {
          names,
          lastNames,
          dni,
          phone,
          email,
          balance,
          idDniType,
          dniType
        } = rows[0];
        // Function to get represantive's students
        const { students } = await getStudents(idRepresentative, true);
        const representative = {
          names,
          lastNames,
          dni,
          phone,
          email,
          balance,
          idDniType,
          dniType,
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
  students.names AS names,
  students.lastnames AS lastNames,
  students.dni,
  relationship,
  bornDate,
  students.idDniType,
  scholarYear AS gradeName,
  section AS sectionName,
  students.idGrade AS idGrade,
  students.idSection AS idSection,
  status
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
        console.log(errStudent);
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
  balance
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
            balance
          } = rows[0];

          const { students } = await getStudents(idRepresentative, false);

          const { idProducts } = await getProducts(idRepresentative);

          const representative = {
            idRepresentative,
            names,
            lastNames,
            dni,
            idDniType,
            phone,
            email,
            balance,
            students,
            idProducts
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

const getProducts = async idRepresentative => {
  const query = `SELECT DISTINCT idProduct FROM productsbalance WHERE idRepresentative = ${idRepresentative};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetProducts, rows) => {
      if (!errGetProducts) {
        const idProducts = [];
        rows.forEach(row => {
          idProducts.push(row.idProduct);
        });
        resolve({ idProducts });
      } else {
        resolve({ errGetProducts });
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
          idDniType
        };
        resolve({ representative });
      } else {
        resolve({ errAddRepresentative });
      }
    });
  });
};

// Query to update representative
const updRepresentative = async (
  idRepresentative,
  names,
  lastNames,
  idDniType,
  dni,
  phone,
  email
) => {
  const query = `UPDATE representatives SET names = "${names}", lastnames = "${lastNames}", dni = "${dni}" ,phone = "${phone}", email = "${email}", idDniType = ${idDniType} WHERE idRepresentative = ${idRepresentative};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdRepresentative => {
      if (!errUpdRepresentative) {
        const representative = {
          idRepresentative,
          names,
          lastNames,
          idDniType,
          dni,
          phone,
          email
        };
        resolve({ representative });
      } else {
        console.log(errUpdRepresentative);
        resolve({ errUpdRepresentative });
      }
    });
  });
};

module.exports = router;
