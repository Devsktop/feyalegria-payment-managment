const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select register http://localhost:3500/api/registers ?pag=number
router.get('/products', async (req, res) => {
  const { pag } = req.query;
  // Query to get Registers
  const { registers, errGetRegisters } = await getRegisters(pag);

  if (errGetRegisters) {
    res.status(400).json({ errGetRegisters });
    return null;
  }

  res.status(200).json(registers);

  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get registers
const getRegisters = async pag => {
  const pagIndex = pag * 10;
  const registers = {};
  const query = `SELECT 
  idRegister, 
  date, 
  IFNULL(ROUND(((transfers + cash)/ dolarPrice) + dolars, 2), 0) AS amount,
  observation, 
  reference, 
  CONCAT(representatives.names, ' ', representatives.lastnames) AS representative 
  FROM registers, representatives 
  WHERE registers.idRepresentative = representatives.idRepresentative 
  LIMIT ${pagIndex} , 10;;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetRegisters, rows) => {
      if (!errGetRegisters) {
        rows.forEach(row => {
          registers[row.idRegister] = { ...row };
        });
        resolve({ registers });
      } else {
        resolve({ errGetRegisters });
      }
    });
  });
};

module.exports = router;
