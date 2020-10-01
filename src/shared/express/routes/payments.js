const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Query to get Today payments
const getTodayPayments = async () => {
  const query = `SELECT SUM(transfers) AS transfers, SUM(cash) AS cash, SUM((transfers+cash)/dolarPrice) AS total FROM registers WHERE DAY(DATE) = DAY(DATE(now()));`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errTodayPayments, rows) => {
      if (!errTodayPayments) {
        const { transfers, cash, total } = rows[0];
        const todayParam = { transfers, cash, total };
        const todayDolarTotal = total;
        resolve({ todayParam, todayDolarTotal });
      } else {
        resolve({ errTodayPayments });
      }
    });
  });
};

// Query to get Today dolar array
const getTodayDolarArray = async (todayParam, todayDolar) => {
  const dolar = [];
  let todayDolarTotal = todayDolar;

  const query = `SELECT sum(dolars) AS amount, dolarPrice AS exchange, (sum(dolars) * dolarPrice) AS convertion FROM registers WHERE DAY(DATE) = DAY(DATE(now())) GROUP BY dolarPrice;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errTodayDolarArray, rows) => {
      if (!errTodayDolarArray) {
        rows.forEach(row => {
          const { amount, exchange, convertion } = row;
          dolar.push({ amount, exchange, convertion });
          todayDolarTotal += amount;
        });
        const today = { ...todayParam, dolar, total: todayDolarTotal };
        resolve({ today });
      } else {
        resolve({ errTodayDolarArray });
      }
    });
  });
};

// Query to get Month payments
const getMonthPayments = async () => {
  const query = `SELECT SUM(transfers) AS transfers, SUM(cash) AS cash, SUM((transfers+cash)/dolarPrice) AS total FROM registers WHERE MONTH(DATE) = MONTH(DATE(now()));`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errMonthPayments, rows) => {
      if (!errMonthPayments) {
        const { transfers, cash, total } = rows[0];
        const monthParam = { transfers, cash, total };
        const monthDolarTotal = total;
        resolve({ monthParam, monthDolarTotal });
      } else {
        resolve({ errMonthPayments });
      }
    });
  });
};

// Query to get Month dolar array
const getMonthDolarArray = async (monthParam, monthDolar) => {
  const dolar = [];
  let monthDolarTotal = monthDolar;
  let rangeSplit = [];
  let range = '';

  const query = `SELECT concat(MIN(day(date)) , ' - ', MAX(day(date))) AS rango, sum(dolars) AS amount, dolarPrice AS exchange, (sum(dolars) * dolarPrice) AS convertion FROM registers WHERE MONTH(DATE) = MONTH(DATE(now())) GROUP BY dolarPrice;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errMonthDolarArray, rows) => {
      if (!errMonthDolarArray) {
        rows.forEach(row => {
          const { rango, amount, exchange, convertion } = row;
          range = rango;
          rangeSplit = row.rango.split(' - ');
          if (rangeSplit[0] === rangeSplit[1]) {
            rangeSplit.splice(1);
            [range] = rangeSplit;
          }
          dolar.push({ range, amount, exchange, convertion });
          monthDolarTotal += amount;
        });
        const month = { ...monthParam, dolar, total: monthDolarTotal };
        resolve({ month });
      } else {
        resolve({ errMonthDolarArray });
      }
    });
  });
};

// Query to get Month receivable
const getMonthReceivable = async () => {
  const query = `SELECT sum(total) AS receivable FROM monthlypaymentsbalance WHERE MONTH(date) = MONTH(DATE(now()))`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errMonthReceivable, rows) => {
      if (!errMonthReceivable) {
        const { receivable } = rows[0];
        resolve({ receivable });
      } else {
        resolve({ errMonthReceivable });
      }
    });
  });
};

// Query to get Current Month advancement
const getCurrentMonthAdvancement = async () => {
  const monthInAdvance = {};
  let currentMonthAdvancementDolarTotal = 0;

  const query = `SELECT payedMonth AS month, advancements.transfer, advancements.cash, SUM((advancements.transfer+advancements.cash)/registers.dolarPrice) AS total FROM advancements, registers WHERE MONTH(registers.date) > MONTH(NOW())`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errCurrentMonthAdvancement, rows) => {
      if (!errCurrentMonthAdvancement) {
        rows.forEach(row => {
          const { month, transfer, cash, total } = row;
          monthInAdvance[month] = { month, transfer, cash };
          currentMonthAdvancementDolarTotal = total;
        });
        const currentMonthAdvancementParam = { monthInAdvance };
        resolve({
          currentMonthAdvancementParam,
          currentMonthAdvancementDolarTotal
        });
      } else {
        resolve({ errCurrentMonthAdvancement });
      }
    });
  });
};

// Query to get Current Month advancement dolar array
const getCurrentMonthAdvancementDolarArray = async (
  currentMonthAdvancementParam,
  currentMonthAdvancementDolarTotal
) => {
  const dolar = [];
  let currentMonthAdDolarTotal = currentMonthAdvancementDolarTotal;
  let rangeSplit = [];
  let range = '';

  const query = `SELECT concat(MIN(day(registers.date)) , ' - ', MAX(day(registers.date))) AS rango, sum(advancements.dolars) AS amount, registers.dolarPrice AS exchange, (sum(advancements.dolars) * registers.dolarPrice) AS convertion FROM registers, advancements WHERE MONTH(date) > MONTH(DATE(now())) GROUP BY registers.dolarPrice;`;

  return new Promise(resolve => {
    mysqlConnection.query(
      query,
      (errCurrentMonthAdvancementDolarArray, rows) => {
        if (!errCurrentMonthAdvancementDolarArray) {
          rows.forEach(row => {
            const { rango, amount, exchange, convertion } = row;
            range = rango;
            rangeSplit = row.rango.split(' - ');
            if (rangeSplit[0] === rangeSplit[1]) {
              rangeSplit.splice(1);
              [range] = rangeSplit;
            }
            dolar.push({ range, amount, exchange, convertion });
            currentMonthAdDolarTotal += amount;
          });
          const currentMonthAdvancement = {
            ...currentMonthAdvancementParam,
            dolar,
            total: currentMonthAdDolarTotal
          };
          resolve({ currentMonthAdvancement });
          console.log(currentMonthAdvancement);
        } else {
          resolve({ errCurrentMonthAdvancementDolarArray });
        }
      }
    );
  });
};

// Rutas o Endpoints
// 1.-Select Payments Initial Props http://localhost:3500/api/payments
router.get('/payments', async (req, res) => {
  // Query to get Today payments

  const {
    todayParam,
    todayDolarTotal,
    errTodayPayments
  } = await getTodayPayments();

  if (errTodayPayments) {
    res.status(400).json({ errTodayPayments });
    return null;
  }

  // Query to get Today dolar array
  const { today, errTodayDolarArray } = await getTodayDolarArray(
    todayParam,
    todayDolarTotal
  );
  if (errTodayDolarArray) {
    res.status(400).json({ errTodayDolarArray });
    return null;
  }

  // // Query to get Month payments
  const {
    monthParam,
    monthDolarTotal,
    errMonthPayments
  } = await getMonthPayments();
  if (errMonthPayments) {
    res.status(400).json({ errMonthPayments });
    return null;
  }

  // // Query to get Month dolar array
  const { month, errMonthDolarArray } = await getMonthDolarArray(
    monthParam,
    monthDolarTotal
  );
  if (errMonthDolarArray) {
    res.status(400).json({ errMonthDolarArray });
    return null;
  }

  // // Query to get Month receivable
  const { receivable, errMonthReceivable } = await getMonthReceivable();
  if (errMonthReceivable) {
    res.status(400).json({ errMonthReceivable });
    return null;
  }

  // Query to get Current Month Advancement
  const {
    currentMonthAdvancementParam,
    currentMonthAdvancementDolarTotal,
    errCurrentMonthAdvancement
  } = await getCurrentMonthAdvancement();
  if (errCurrentMonthAdvancement) {
    res.status(400).json({ errCurrentMonthAdvancement });
    return null;
  }

  // Query to get Current Month Advancement Dolar Array
  const {
    currentMonthAdvancement,
    errCurrentMonthAdvancementDolarArray
  } = await getCurrentMonthAdvancementDolarArray(
    currentMonthAdvancementParam,
    currentMonthAdvancementDolarTotal
  );
  console.log(currentMonthAdvancement);
  if (errCurrentMonthAdvancementDolarArray) {
    res.status(400).json({ errCurrentMonthAdvancementDolarArray });
    return null;
  }

  res.status(200).json();
});

module.exports = router;
