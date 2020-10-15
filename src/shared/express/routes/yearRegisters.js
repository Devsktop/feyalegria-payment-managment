const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select yearRegisters http://localhost:3500/api/yearRegisters
router.get('/yearRegisters', async (req, res) => {
  // Query to get Products
  const { yearRegisters, errGetyearRegisters } = await getyearRegisters();

  if (errGetyearRegisters) {
    res.status(400).json({ errGetyearRegisters });
    return null;
  }

  res.status(200).json(yearRegisters);

  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get yearsRegisters
const getyearRegisters = async () => {
  const query = `SELECT IFNULL(SUM(transfers), 0) AS transfers, IFNULL(SUM(cash), 0) AS cash, IFNULL(SUM(((transfers+cash)/dolarPrice) + dolars), 0) AS dolar FROM registers WHERE YEAR(DATE) = YEAR(DATE(now()));`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGetyearRegisters, rows) => {
      if (!errGetyearRegisters) {
        const { transfers, cash, dolar } = rows[0];
        // Function to get concepts
        const { concepts } = await getyearRegistersConcepts();
        // Function to get estimatedFund
        const { estimatedFund } = await getyearRegistersEstimatedFunds();
        // Function to get paidFund
        const { paidFund } = await getyearRegistersPaidFunds();
        // Operation to get finalFund
        const finalFund = estimatedFund - paidFund;
        // Constructing the object
        const yearRegisters = {
          paymentMethods: {
            transfers,
            cash,
            dolar
          },
          concepts,
          estimatedFund,
          paidFund,
          finalFund
        };
        // VALIDAR QUE NO SEA NEGATIVO CUANDO paidFund > estimatedFund
        resolve(yearRegisters);
      } else {
        resolve({ errGetyearRegisters });
      }
    });
  });
};

// Query to get yearsRegisters concepts
const getyearRegistersConcepts = async () => {
  const concepts = {};
  const query = `SELECT paymentsconcepts.idPaymentsConcept, paymentsconcepts.name AS concept, paymentsconcepts.price, paymentsconceptsbalance.transfer, paymentsconceptsbalance.cash, paymentsconceptsbalance.dolars, IFNULL(SUM(((paymentsconceptsbalance.transfer+paymentsconceptsbalance.cash)/registers.dolarPrice) + paymentsconceptsbalance.dolars), 0) AS total FROM registers, paymentsconcepts, paymentsconceptsbalance WHERE YEAR(registers.date) = YEAR((now())) AND registers.idRegister = paymentsconceptsbalance.idRegister;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetyearRegisters, rows) => {
      if (!errGetyearRegisters) {
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
        resolve({ errGetyearRegisters });
      }
    });
  });
};

// Query to get Month Registers Estimated Funds
const getyearRegistersEstimatedFunds = async () => {
  const query = `SELECT IFNULL(ROUND((COUNT(idStudent) * price) * 12, 2), 0) AS estimatedFund FROM students, rates WHERE inscription = 1 AND type = "monthlyPayments";`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetyearsEstimatedFunds, rows) => {
      if (!errGetyearsEstimatedFunds) {
        const { estimatedFund } = rows[0];
        resolve({ estimatedFund });
      } else {
        resolve({ errGetyearsEstimatedFunds });
      }
    });
  });
};

// Query to get Month Registers Paid Funds
const getyearRegistersPaidFunds = async () => {
  const query = `SELECT IFNULL(ROUND(SUM(total), 2), 0) AS paidFund FROM monthlypaymentsbalance WHERE YEAR(date) = YEAR(NOW());`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetyearsPaiddFunds, rows) => {
      if (!errGetyearsPaiddFunds) {
        const { paidFund } = rows[0];
        resolve({ paidFund });
      } else {
        resolve({ errGetyearsPaiddFunds });
      }
    });
  });
};

module.exports = router;
