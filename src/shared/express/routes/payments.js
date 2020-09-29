const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Query to get Today payments
const getTodayPayments = res => {
  let todayParam = null;
  let todayDolarTotal = 0;
  let err;
  const query = `SELECT SUM(transfers) AS transfers, SUM(cash) AS cash, SUM((transfers+cash)/dolarPrice) AS total FROM registers WHERE DAY(DATE) = DAY(DATE(now()));`;
  mysqlConnection.query(query, (error, rows) => {
    if (!error) {
      const { transfers, cash, total } = rows[0];
      todayParam = { transfers, cash, total };
      todayDolarTotal = total;
    } else {
      err = error;
    }
  });

  if (todayParam) {
    return { todayParam, todayDolarTotal };
  }
  return res.status(404).json({ err });
};

// Query to get Today dolar array
const getTodayDolarArray = (res, todayParam, todayDolar) => {
  const dolar = [];
  let todayDolarTotal = todayDolar;

  const query = `SELECT sum(dolars) AS amount, dolarPrice AS exchange, (sum(dolars) * dolarPrice) AS convertion FROM registers WHERE DAY(DATE) = DAY(DATE(now())) GROUP BY dolarPrice;`;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      rows.forEach(row => {
        const { amount, exchange, convertion } = row;
        dolar.push({ amount, exchange, convertion });
        todayDolarTotal += amount;
      });
      const today = { ...todayParam, dolar, total: todayDolarTotal };

      return today;
    }

    res.status(404).json({ err });
    return null;
  });
};

// Query to get Month payments
const getMonthPayments = res => {
  let monthDolarTotal = 0;
  const query = `SELECT SUM(transfers) AS transfers, SUM(cash) AS cash, SUM((transfers+cash)/dolarPrice) AS total FROM registers WHERE MONTH(DATE) = MONTH(DATE(now()));`;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      const { transfers, cash, total } = rows[0];
      const monthParam = { transfers, cash, total };
      monthDolarTotal = total;
      return { monthParam, monthDolarTotal };
    }
    res.status(404).json({ err });
    return null;
  });
};

// Query to get Month dolar array
const getMonthDolarArray = (res, monthParam, monthDolar) => {
  const dolar = [];
  let monthDolarTotal = monthDolar;
  let rangeSplit = [];
  let range = '';

  const query = `SELECT concat(MIN(day(date)) , ' - ', MAX(day(date))) AS rango, sum(dolars) AS amount, dolarPrice AS exchange, (sum(dolars) * dolarPrice) AS convertion FROM registers WHERE MONTH(DATE) = MONTH(DATE(now())) GROUP BY dolarPrice;`;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
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
      return month;
    }
    res.status(404).json({ err });
    return null;
  });
};

// Rutas o Endpoints
// 1.-Select Payments Initial Props http://localhost:3500/api/payments
router.get('/payments', (req, res) => {
  // Query to get Today payments
  const { todayParam, todayDolarTotal } = getTodayPayments(res);
  // Query to get Today dolar array
  const today = getTodayDolarArray(res, todayParam, todayDolarTotal);

  // Query to get Month payments
  const { monthParam, monthDolarTotal } = getMonthPayments(res);

  // Query to get Month dolar array
  const month = getMonthDolarArray(res, monthParam, monthDolarTotal);
});

module.exports = router;
