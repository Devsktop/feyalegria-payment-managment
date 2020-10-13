const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select monthRegisters http://localhost:3500/api/monthRegisters
router.get('/monthRegisters', async (req, res) => {
  // Query to get Products
  const { monthRegisters, errGetmonthRegisters } = await getmonthRegisters();

  if (errGetmonthRegisters) {
    res.status(400).json({ errGetmonthRegisters });
    return null;
  }

  res.status(200).json(monthRegisters);

  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Split Range
const splitRange = rango => {
  let rangeSplit = [];
  let range = '';

  range = rango;
  rangeSplit = rango.split(' - ');
  if (rangeSplit[0] === rangeSplit[1]) {
    rangeSplit.splice(1);
    [range] = rangeSplit;
  }
  return range;
};

// Query to get monthRegisters
const getmonthRegisters = async () => {
  const query = `SELECT IFNULL(SUM(transfers), 0) AS transfers, IFNULL(SUM(cash), 0) AS cash, IFNULL(SUM((transfers+cash)/dolarPrice), 0) AS total FROM registers WHERE MONTH(DATE) = MONTH(DATE(now()))`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGetmonthRegisters, rows) => {
      if (!errGetmonthRegisters) {
        const { transfers, cash, total } = rows[0];
        // Function to get dolar array
        const { dolar, totalDolar } = await getMonthRegistersDolarArray(total);
        // Function to get concepts
        const { concepts } = await getMonthRegistersConcepts();
        // Function to get estimatedFund
        const { estimatedFund } = await getMonthRegistersEstimatedFunds();
        // Function to get paidFund
        const { paidFund } = await getMonthRegistersPaidFunds();
        // Operation to get finalFund
        const finalFund = estimatedFund - paidFund;
        // Constructing the object
        const monthRegisters = {
          paymentMethods: {
            transfers,
            cash,
            dolar,
            total: totalDolar
          },
          concepts,
          estimatedFund,
          paidFund,
          finalFund
        };
        // VALIDAR QUE NO SEA NEGATIVO CUANDO paidFund > estimatedFund
        resolve(monthRegisters);
      } else {
        resolve({ errGetmonthRegisters });
      }
    });
  });
};

// Query to get Month dolar array
const getMonthRegistersDolarArray = async total => {
  const dolar = [];
  let totalDolar = total;

  const query = `SELECT concat(MIN(day(date)) , ' - ', MAX(day(date))) AS rango, sum(dolars) AS amount, dolarPrice AS exchange, (sum(dolars) * dolarPrice) AS convertion FROM registers WHERE MONTH(DATE) = MONTH(DATE(now())) GROUP BY dolarPrice;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errMonthRegistersDolarArray, rows) => {
      if (!errMonthRegistersDolarArray) {
        rows.forEach(row => {
          const { rango, amount, exchange, convertion } = row;
          const range = splitRange(rango);
          dolar.push({ range, amount, exchange, convertion });
          totalDolar += amount;
        });
        resolve(dolar, totalDolar);
      } else {
        resolve({ errMonthRegistersDolarArray });
      }
    });
  });
};

// Query to get monthRegisters concepts
const getMonthRegistersConcepts = async () => {
  const concepts = {};
  const query = `SELECT paymentsconcepts.idPaymentsConcept, paymentsconcepts.name AS concept, paymentsconcepts.price, paymentsconceptsbalance.transfer, paymentsconceptsbalance.cash, paymentsconceptsbalance.dolars, IFNULL(SUM(((paymentsconceptsbalance.transfer+paymentsconceptsbalance.cash)/registers.dolarPrice) + paymentsconceptsbalance.dolars), 0) AS total FROM registers, paymentsconcepts, paymentsconceptsbalance WHERE MONTH(registers.date) = MONTH((now())) AND registers.idRegister = paymentsconceptsbalance.idRegister;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetMonthRegistersConcepts, rows) => {
      if (!errGetMonthRegistersConcepts) {
        rows.forEach(row => {
          const {
            idPaymentsConcept,
            concept,
            price,
            transfer,
            cash,
            dolars,
            total
          } = row;
          concepts[idPaymentsConcept] = {
            concept,
            price,
            details: { transfer, cash, dolars, total }
          };
        });
        resolve({ concepts });
      } else {
        resolve({ errGetMonthRegistersConcepts });
      }
    });
  });
};

module.exports = router;
