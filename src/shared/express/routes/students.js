const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints

// 1.-Select 10 Solvent & 10 Insolvent Students http://localhost:3500/api/students
router.get('/students', (req, res) => {
  // const students = {};
  // let joinedStudents;
  // let insolventStudents;
  // let solventStudents;

  // // Query to select 10 Solvent Students
  // let query =
  //   'SELECT students.idStudent, CONCAT(students.names, " ", students.lastnames) AS name, students.dni, bornDate, CONCAT(representatives.names, " ", representatives.lastnames) AS representative from students, representatives, monthpayments, paymentconceptsbalance where representatives.idRepresentative = students.idRepresentative AND monthpayments.idStudent = students.idStudent AND students.inscription = true AND monthpayments.paidMonth >= (SELECT currentMonth from globals WHERE idGlobal = 1 ) AND monthpayments.paidAmount = monthpayments.debtAmount AND paymentconceptsbalance.idMonthPayment = monthpayments.idMonthPayment AND paymentconceptsbalance.paidAmount = paymentconceptsbalance.debtAmount LIMIT 10';
  // mysqlConnection.query(query, (err, rows) => {
  //   if (!err) {
  //     rows.forEach(row => {
  //       students[row.idStudent] = { ...row, solvent: true };
  //     });
  //   } else {
  //     res.status(404).json({
  //       err
  //     });
  //   }
  // });

  // // Query to select 10 Insolvent Students
  // query =
  //   'SELECT idStudent, CONCAT(students.names, " ", students.lastnames) AS name, students.dni, borndate, CONCAT(representatives.names, " ", representatives.lastnames) AS representative, students.balance from students, representatives where representatives.idRepresentative = students.idRepresentative AND students.inscription = true AND students.balance < 0 LIMIT 10;';
  // mysqlConnection.query(query, (err, rows) => {
  //   if (!err) {
  //     rows.forEach(row => {
  //       students[row.idStudent] = { ...row, solvent: false };
  //     });
  //   } else {
  //     res.status(404).json({
  //       err
  //     });
  //   }
  // });

  // // Query to get students total
  // query =
  //   'SELECT COUNT(idStudent) AS joinedStudents from students where inscription = true';
  // mysqlConnection.query(query, (err, rows) => {
  //   if (!err) {
  //     joinedStudents = rows[0].joinedStudents;
  //   } else {
  //     res.status(404).json({
  //       err
  //     });
  //   }
  // });

  // // Query to get Students solventStudents
  // query =
  //   'SELECT COUNT(idStudent) AS solventStudents from students where inscription = true AND balance >= 0';
  // mysqlConnection.query(query, (err, rows) => {
  //   if (!err) {
  //     solventStudents = rows[0].solventStudents;
  //   } else {
  //     res.status(404).json({
  //       err
  //     });
  //   }
  // });

  // // Query to get Students insolventStudents
  // query =
  //   'SELECT COUNT(idStudent) AS insolventStudents from students where balance < 0';
  // mysqlConnection.query(query, (err, rows) => {
  //   if (!err) {
  //     insolventStudents = rows[0].insolventStudents;
  //     res.status(200).json({
  //       students,
  //       joinedStudents,
  //       solventStudents,
  //       insolventStudents
  //     });
  //   } else {
  //     res.status(404).json({
  //       err
  //     });
  //   }
  // });
  res.status(200).json({
    students: {},
    joinedStudents: {},
    solventStudents: {},
    insolventStudents: {}
  });
});

// 2.- Get students by section http://localhost:3500/api/students/[section] - ?pag=number - ?pattern
router.get('/students/:section', async (req, res) => {
  console.log('here');
  const { section } = req.params;
  const { pag, pattern } = req.query;

  // Query to get students by section
  const {
    studentsBySection,
    errGetStudentsBySection
  } = await getStudentsBySection(section, pag, pattern);
  if (errGetStudentsBySection) {
    res.status(400).json({ errGetStudentsBySection });
    return null;
  }
  res.status(200).json(studentsBySection);
  return null;
});

// Query to get students from section
const getStudentsBySection = async (section, pag, pattern) => {
  const pagIndex = pag * 10;
  const studentsBySection = {};
  const patternQuery = `AND students.names LIKE "%${pattern}%" OR students.lastnames LIKE "%${pattern}%" OR students.dni LIKE "%${pattern}%" OR students.bornDate LIKE "%${pattern}%" OR representatives.names LIKE "%${pattern}%" OR students.balance LIKE "%${pattern}%" OR students.idRepresentative LIKE "%${pattern}%"`;
  const query = `SELECT DISTINCT 
  students.idStudent,
  students.names,
  students.lastnames AS lastNames, 
  students.dni, 
  students.bornDate, 
  CONCAT(representatives.names, " ", representatives.lastnames) AS representative, 
  students.balance, 
  students.idRepresentative
  FROM representatives, students 
  WHERE ${section} = students.idSection 
  AND students.idRepresentative = representatives.idRepresentative
  ${pattern ? patternQuery : ''}
  ORDER BY students.names
  LIMIT ${pagIndex} , 10;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGetStudentsBySection, rows) => {
      if (!errGetStudentsBySection) {
        rows.forEach(row => {
          studentsBySection[row.idStudent] = { ...row };
        });
        resolve({ studentsBySection });
      } else {
        resolve({ errGetStudentsBySection });
      }
    });
  });
};

// 2.- Get student http://localhost:3500/api/representatives/[idRepresentative]
router.get('/studentbyid/:idStudent', async (req, res) => {
  const { idStudent } = req.params;
  // Query to get representative
  const { student, errStudent } = await getStudent(idStudent);
  if (errStudent) {
    res.status(400).json({ errStudent });
    return null;
  }

  res.status(200).json(student);
  return null;
});

// Query to get representative by id
const getStudent = async idStudent => {
  const query = `SELECT 
  names, 
  lastnames AS lastNames, 
  dni, 
  bornDate, 
  grades.scholarYear AS gradeName,
  students.idGrade,
  students.idSection,
  sections.section AS sectionName,
  balance, 
  status,
  relationship,
  students.idDniType,
  letter AS dniType  
  FROM students, dnitype, grades, sections 
  WHERE ${idStudent} = idStudent AND students.idDniType = dnitype.idDniType AND students.idGrade = grades.idGrade AND students.idSection = sections.idSection;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errStudent, rows) => {
      if (!errStudent) {
        const {
          names,
          lastNames,
          dni,
          bornDate,
          gradeName,
          sectionName,
          status,
          balance,
          relationship,
          idDniType,
          dniType,
          idGrade,
          idSection
        } = rows[0];
        const student = {
          names,
          lastNames,
          dni,
          bornDate,
          gradeName,
          sectionName,
          status,
          balance,
          relationship,
          idDniType,
          dniType,
          idGrade,
          idSection
        };
        resolve({ student });
      } else {
        resolve({ errStudent });
      }
    });
  });
};

router.post('/studentbydni', async (req, res, next) => {
  console.log('holiwiris');
  const { dniStudent } = req.body;
  // Query to get representative
  try {
    const { student, errStudent } = await getStudentByDni(dniStudent);
    if (errStudent) {
      res.status(400).json(errStudent);
      return null;
    }

    res.status(200).json(student);
    return null;
  } catch (error) {
    next(error);
  }
});

const getStudentByDni = dniStudent => {
  const query = `SELECT 
  idStudent,
  names, 
  lastnames AS lastNames, 
  dni, 
  bornDate, 
  grades.scholarYear AS gradeName,
  students.idGrade,
  students.idSection,
  sections.section AS sectionName,
  status,
  relationship,
  students.idDniType,
  letter AS dniType  
  FROM students, dnitype, grades, sections 
  WHERE ${dniStudent} = dni AND students.idDniType = dnitype.idDniType AND students.idGrade = grades.idGrade AND students.idSection = sections.idSection;`;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, (errStudent, rows) => {
      try {
        if (!errStudent) {
          if (rows.length === 1) {
            const {
              idStudent,
              names,
              lastNames,
              dni,
              bornDate,
              gradeName,
              sectionName,
              status,
              relationship,
              idDniType,
              dniType,
              idGrade,
              idSection
            } = rows[0];
            const student = {
              idStudent,
              names,
              lastNames,
              dni,
              bornDate,
              gradeName,
              sectionName,
              status,
              relationship,
              idDniType,
              dniType,
              idGrade,
              idSection
            };
            resolve({ student });
          } else {
            resolve({ student: {} });
          }
        } else {
          throw errStudent;
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

// 3.- Post add student http://localhost:3500/api/student
router.post('/student', async (req, res) => {
  const {
    names,
    lastNames,
    dni,
    idDniType,
    bornDate,
    relationship,
    idGrade,
    idSection,
    inscription,
    status,
    idRepresentative
  } = req.body;
  // Query to add student
  const { student, errAddStudent } = await addStudent(
    names,
    lastNames,
    dni,
    idDniType,
    bornDate,
    relationship,
    idGrade,
    idSection,
    inscription,
    status,
    idRepresentative
  );
  if (errAddStudent) {
    res.status(400).json(errAddStudent);
    return null;
  }

  res.status(200).json(student);
  return null;
});

// Query to add student
const addStudent = (
  names,
  lastNames,
  dni,
  idDniType,
  bornDate,
  relationship,
  idGrade,
  idSection,
  inscription,
  status,
  idRepresentative
) => {
  const query = `INSERT INTO students(names, lastNames, dni, idDniType, bornDate, relationship, idGrade, idSection, inscription, status, idRepresentative) 
  VALUES
  ("${names}", 
  "${lastNames}", 
  "${dni}", 
  ${idDniType},
  "${bornDate}", 
  "${relationship}",
  ${idGrade}, 
  ${idSection},
  ${inscription},
  "${status}",
  ${idRepresentative}
  );`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errAddStudent, rows) => {
      if (!errAddStudent) {
        const student = {
          idStudent: rows.insertId,
          names,
          lastNames,
          dni,
          idDniType,
          bornDate,
          relationship,
          idGrade,
          idSection,
          inscription,
          status
        };
        resolve({ student });
      } else {
        resolve({ errAddStudent });
      }
    });
  });
};

// 4.- Update Student http://localhost:3500/api/updStudent
router.post('/updStudent', async (req, res) => {
  const {
    idStudent,
    names,
    lastNames,
    idDniType,
    dni,
    bornDate,
    relationship,
    idGrade,
    idSection,
    inscription,
    status
  } = req.body;
  // Query to update student
  const { student, errUpdStudent } = await updStudent(
    idStudent,
    names,
    lastNames,
    idDniType,
    dni,
    bornDate,
    relationship,
    idGrade,
    idSection,
    inscription,
    status
  );
  if (errUpdStudent) {
    res.status(400).json({ errUpdStudent });
    return null;
  }

  res.status(200).json(student);
  return null;
});

// Query to update student
const updStudent = async (
  idStudent,
  names,
  lastNames,
  idDniType,
  dni,
  bornDate,
  relationship,
  idGrade,
  idSection,
  inscription,
  status
) => {
  const query = `UPDATE students SET names = "${names}", lastnames = "${lastNames}", dni = "${dni}" , bornDate = "${bornDate}", relationship = "${relationship}", idDniType = ${idDniType}, idGrade = ${idGrade}, idSection = ${idSection}, inscription= ${inscription}, status = "${status}" WHERE idStudent = ${idStudent};`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdStudent => {
      if (!errUpdStudent) {
        const student = {
          idStudent,
          names,
          lastNames,
          idDniType,
          dni,
          bornDate,
          relationship,
          idGrade,
          idSection,
          inscription,
          status
        };
        resolve({ student });
      } else {
        resolve({ errUpdStudent });
      }
    });
  });
};

module.exports = router;
