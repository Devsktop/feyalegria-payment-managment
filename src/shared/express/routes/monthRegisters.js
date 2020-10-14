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
        // Function to get advancement
        const {
          monthInAdvance,
          totalAdvancement
        } = await getMonthRegistersAdvancement();
        // Constructing advancement object
        const advancement = {
          monthInAdvance,
          total: totalAdvancement
        };
        // Function to get arrear
        const { monthInArrear, totalArrear } = await getMonthRegistersArrear();
        // Constructing arrear object
        const arrear = {
          monthInArrear,
          total: totalArrear
        };
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
          advancement,
          arrear,
          estimatedFund,
          paidFund,
          finalFund
        };
        console.log(monthRegisters);
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
        resolve({ dolar, totalDolar });
      } else {
        resolve({ errMonthRegistersDolarArray });
      }
    });
  });
};

// Query to get monthRegisters concepts
const getMonthRegistersConcepts = async () => {
  const concepts = {};
  const query = `SELECT paymentsconcepts.idPaymentsConcept, paymentsconcepts.name AS concept, paymentsconcepts.price, paymentsconceptsbalance.transfer, paymentsconceptsbalance.cash, paymentsconceptsbalance.dolars, IFNULL(ROUND((SUM(paymentsconceptsbalance.transfer)+SUM(paymentsconceptsbalance.cash)/registers.dolarPrice), 2), 0) AS total FROM registers, paymentsconcepts, paymentsconceptsbalance WHERE MONTH(paymentsconceptsbalance.date) = MONTH((now())) AND registers.idRegister = paymentsconceptsbalance.idRegister;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetMonthRegistersConcepts, rows) => {
      if (!errGetMonthRegistersConcepts) {
        rows.forEach(async row => {
          const {
            idPaymentsConcept,
            concept,
            price,
            transfer,
            cash,
            total
          } = row;
          // Function to get concepts dolar array
          const {
            dolar,
            totalDolar
          } = await getMonthRegistersConceptsDolarArray(total);
          concepts[idPaymentsConcept] = {
            concept,
            price,
            details: { transfer, cash, dolar, total: totalDolar }
          };
        });
        resolve({ concepts });
      } else {
        resolve({ errGetMonthRegistersConcepts });
      }
    });
  });
};

// Query to get Month Concepts dolar array
const getMonthRegistersConceptsDolarArray = async total => {
  const dolar = [];
  let totalDolar = total;

  const query = `SELECT concat(MIN(day(paymentsconceptsbalance.date)) , ' - ', MAX(day(paymentsconceptsbalance.date))) AS rango, sum(paymentsconceptsbalance.dolars) AS amount, dolarPrice AS exchange, (sum(paymentsconceptsbalance.dolars) * dolarPrice) AS convertion FROM paymentsconceptsbalance, registers WHERE MONTH(paymentsconceptsbalance.date) = MONTH(DATE(now())) GROUP BY dolarPrice;`;

  return new Promise(resolve => {
    mysqlConnection.query(
      query,
      (errMonthRegistersConceptsDolarArray, rows) => {
        if (!errMonthRegistersConceptsDolarArray) {
          rows.forEach(row => {
            const { rango, amount, exchange, convertion } = row;
            const range = splitRange(rango);
            dolar.push({ range, amount, exchange, convertion });
            totalDolar += amount;
          });
          resolve(dolar, totalDolar);
        } else {
          resolve({ errMonthRegistersConceptsDolarArray });
        }
      }
    );
  });
};

// Query to get Current Month advancement dolar array
const getMonthRegistersAdvancementDolarArray = async month => {
  const dolar = [];

  const query = `SELECT concat(MIN(day(registers.date)) , ' - ', MAX(day(registers.date))) AS rango, sum(advancements.dolars) AS amount, registers.dolarPrice AS exchange, (sum(advancements.dolars) * registers.dolarPrice) AS convertion FROM registers, advancements WHERE payedMonth = ? AND advancements.idRegister = registers.idRegister GROUP BY registers.dolarPrice;`;

  return new Promise(resolve => {
    let total = 0;
    mysqlConnection.query(
      query,
      [month],
      (errCurrentMonthAdvancementDolarArray, rows) => {
        if (!errCurrentMonthAdvancementDolarArray) {
          rows.forEach(row => {
            const { rango, amount, exchange, convertion } = row;
            const range = splitRange(rango);
            dolar.push({ range, amount, exchange, convertion });
            total += amount;
          });
          const currentMonthAdvancement = {
            dolar,
            totalDolar: total
          };
          resolve(currentMonthAdvancement);
        } else {
          resolve({ errCurrentMonthAdvancementDolarArray });
        }
      }
    );
  });
};

// Query to get Month Registers Advancement
const getMonthRegistersAdvancement = async () => {
  const monthInAdvance = {};
  let total = 0;
  let counter = 0;

  const query = `SELECT IFNULL(payedMonth, 0) AS month, IFNULL(advancements.transfer, 0) AS transfer, IFNULL(advancements.cash, 0) AS cash, IFNULL(SUM((advancements.transfer+advancements.cash)/registers.dolarPrice), 0) AS totalBs FROM advancements, registers WHERE payedMonth > MONTH(NOW())`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errCurrentMonthAdvancement, rows) => {
      if (!errCurrentMonthAdvancement) {
        rows.forEach(async row => {
          const { month, transfer, cash, totalBs } = row;
          const {
            dolar,
            totalDolar
          } = await getMonthRegistersAdvancementDolarArray(month);

          monthInAdvance[month] = { month, transfer, cash, dolar };
          total += totalDolar + totalBs;
          counter += 1;

          if (counter === rows.length) {
            resolve({
              monthInAdvance,
              totalAdvancement: total
            });
          }
        });
      } else {
        resolve({ errCurrentMonthAdvancement });
      }
    });
  });
};

// Query to get Month Registers Arrear dolar array
const getMonthRegistersArrearDolarArray = async month => {
  const dolar = [];

  const query = `SELECT concat(MIN(day(registers.date)) , ' - ', MAX(day(registers.date))) AS rango, sum(arrears.dolars) AS amount, registers.dolarPrice AS exchange, (sum(arrears.dolars) * registers.dolarPrice) AS convertion FROM registers, arrears WHERE payedMonth = ? AND arrears.idRegister = registers.idRegister GROUP BY registers.dolarPrice;`;

  return new Promise(resolve => {
    let total = 0;
    mysqlConnection.query(
      query,
      [month],
      (errGetMonthRegistersArrearDolarArray, rows) => {
        if (!errGetMonthRegistersArrearDolarArray) {
          rows.forEach(row => {
            const { rango, amount, exchange, convertion } = row;
            const range = splitRange(rango);
            dolar.push({ range, amount, exchange, convertion });
            total += amount;
          });
          const currentMonthArrear = {
            dolar,
            totalDolar: total
          };
          resolve(currentMonthArrear);
        } else {
          resolve({ errGetMonthRegistersArrearDolarArray });
        }
      }
    );
  });
};

// Query to get Month Registers Arrear
const getMonthRegistersArrear = async () => {
  const monthInArrear = {};
  let total = 0;
  let counter = 0;

  const query = `SELECT IFNULL(payedMonth, 0) AS month, IFNULL(arrears.transfer, 0) AS transfer, IFNULL(arrears.cash, 0) AS cash, IFNULL(SUM((arrears.transfer+arrears.cash)/registers.dolarPrice), 0) AS totalBs FROM arrears, registers WHERE payedMonth < MONTH(NOW())`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetMonthRegistersArrear, rows) => {
      if (!errGetMonthRegistersArrear) {
        rows.forEach(async row => {
          const { month, transfer, cash, totalBs } = row;
          const { dolar, totalDolar } = await getMonthRegistersArrearDolarArray(
            month
          );

          monthInArrear[month] = { month, transfer, cash, dolar };
          total += totalDolar + totalBs;
          counter += 1;

          if (counter === rows.length) {
            resolve({
              monthInArrear,
              totalArrear: total
            });
          }
        });
      } else {
        resolve({ errGetMonthRegistersArrear });
      }
    });
  });
};

// Query to get Month Registers Estimated Funds
const getMonthRegistersEstimatedFunds = async () => {
  const query = `SELECT IFNULL(ROUND(COUNT(idStudent) * price, 2), 0) AS estimatedFund FROM students, rates WHERE inscription = 1 AND type = "monthlyPayments";`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetMonthRegistersEstimatedFunds, rows) => {
      if (!errGetMonthRegistersEstimatedFunds) {
        const { estimatedFund } = rows[0];
        resolve({ estimatedFund });
      } else {
        resolve({ errGetMonthRegistersEstimatedFunds });
      }
    });
  });
};

// Query to get yearsRegisters Funds
const getMonthRegistersPaidFunds = async () => {
  const query = `SELECT IFNULL(ROUND(SUM(total), 2), 0) AS paidFund FROM monthlypaymentsbalance WHERE MONTH(date) = MONTH(NOW());`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetMonthRegistersPaidFunds, rows) => {
      if (!errGetMonthRegistersPaidFunds) {
        const { paidFund } = rows[0];
        resolve({ paidFund });
      } else {
        resolve({ errGetMonthRegistersPaidFunds });
      }
    });
  });
};

module.exports = router;
