const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

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

// Query to get Today payments
const getTodayPayments = async () => {
  const query = `SELECT IFNULL(SUM(transfers), 0) AS transfers, IFNULL(SUM(cash), 0) AS cash, IFNULL(ROUND(SUM((transfers+cash)/dolarPrice),2), 0) AS total FROM registers WHERE DAY(DATE) = DAY(DATE(now()));`;

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
  const query = `SELECT IFNULL(SUM(transfers), 0) AS transfers, IFNULL(SUM(cash), 0) AS cash, IFNULL(SUM((transfers+cash)/dolarPrice), 0) AS total FROM registers WHERE MONTH(DATE) = MONTH(DATE(now()));`;

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

  const query = `SELECT concat(MIN(day(date)) , ' - ', MAX(day(date))) AS rango, sum(dolars) AS amount, dolarPrice AS exchange, (sum(dolars) * dolarPrice) AS convertion FROM registers WHERE MONTH(DATE) = MONTH(DATE(now())) GROUP BY dolarPrice;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errMonthDolarArray, rows) => {
      if (!errMonthDolarArray) {
        rows.forEach(row => {
          const { rango, amount, exchange, convertion } = row;
          const range = splitRange(rango);
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
  const query = `SELECT IFNULL(sum(total), 0) AS receivable FROM monthlypaymentsbalance WHERE MONTH(date) = MONTH(DATE(now()))`;

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

// Query to get Current Month advancement dolar array
const getCurrentMonthAdvancementDolarArray = async month => {
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

// Query to get Current Month Advancement
const getCurrentMonthAdvancement = async () => {
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
          } = await getCurrentMonthAdvancementDolarArray(month);

          monthInAdvance[month] = { month, transfer, cash, dolar };
          total += totalDolar + totalBs;
          counter += 1;

          if (counter === rows.length) {
            resolve({
              monthInAdvance,
              total
            });
          }
        });
      } else {
        resolve({ errCurrentMonthAdvancement });
      }
    });
  });
};

// Query to get Current Month arrear dolar array
const getCurrentMonthArrearDolarArray = async month => {
  const dolar = [];

  const query = `SELECT concat(MIN(day(registers.date)) , ' - ', MAX(day(registers.date))) AS rango, sum(arrears.dolars) AS amount, registers.dolarPrice AS exchange, (sum(arrears.dolars) * registers.dolarPrice) AS convertion FROM registers, arrears WHERE payedMonth = ? AND arrears.idRegister = registers.idRegister GROUP BY registers.dolarPrice;`;

  return new Promise(resolve => {
    let total = 0;
    mysqlConnection.query(
      query,
      [month],
      (errCurrentMonthArrearDolarArray, rows) => {
        if (!errCurrentMonthArrearDolarArray) {
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
          resolve({ errCurrentMonthArrearDolarArray });
        }
      }
    );
  });
};

// Query to get Current Month Arrear
const getCurrentMonthArrear = async () => {
  const monthInArrear = {};
  let total = 0;
  let counter = 0;

  const query = `SELECT IFNULL(payedMonth, 0) AS month, IFNULL(arrears.transfer, 0) AS transfer, IFNULL(arrears.cash, 0) AS cash, IFNULL(SUM((arrears.transfer+arrears.cash)/registers.dolarPrice), 0) AS totalBs FROM arrears, registers WHERE payedMonth < MONTH(NOW())`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errCurrentMonthArrear, rows) => {
      if (!errCurrentMonthArrear) {
        rows.forEach(async row => {
          const { month, transfer, cash, totalBs } = row;
          const { dolar, totalDolar } = await getCurrentMonthArrearDolarArray(
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
        resolve({ errCurrentMonthArrear });
      }
    });
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

  const finalMonth = { ...month, receivable };

  // Query to get Current Month Advancement
  const {
    monthInAdvance,
    total,
    errCurrentMonthAdvancement
  } = await getCurrentMonthAdvancement();
  if (errCurrentMonthAdvancement) {
    res.status(400).json({ errCurrentMonthAdvancement });
    return null;
  }

  const advancements = { monthInAdvance, total };

  // Query to get Current Month Arrear
  const {
    monthInArrear,
    totalArrear,
    errCurrentMonthArrear
  } = await getCurrentMonthArrear();
  if (errCurrentMonthArrear) {
    res.status(400).json({ errCurrentMonthArrear });
    return null;
  }

  const arrears = { monthInArrear, totalArrear };

  const payments = { today, month: finalMonth, advancements, arrears };

  console.log(payments);

  res.status(200).json(payments);
  return null;
});

module.exports = router;
