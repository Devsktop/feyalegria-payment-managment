const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Query to get  Month arrear dolar array
const getMonthArrearDolarArray = async arrearMonth => {
  const dolar = [];

  const query = `SELECT concat(MIN(day(registers.date)) , ' - ', MAX(day(registers.date))) AS rango, sum(arrears.dolars) AS amount, registers.dolarPrice AS exchange, (sum(arrears.dolars) * registers.dolarPrice) AS convertion FROM registers, arrears WHERE payedMonth = ? AND arrears.idRegister = registers.idRegister GROUP BY registers.dolarPrice;`;

  return new Promise(resolve => {
    let total = 0;
    let rangeSplit = [];
    let range = '';
    mysqlConnection.query(
      query,
      [arrearMonth],
      (errMonthArrearDolarArray, rows) => {
        if (!errMonthArrearDolarArray) {
          rows.forEach(row => {
            const { rango, amount, exchange, convertion } = row;
            range = rango;
            rangeSplit = rango.split(' - ');
            if (rangeSplit[0] === rangeSplit[1]) {
              rangeSplit.splice(1);
              [range] = rangeSplit;
            }
            dolar.push({ range, amount, exchange, convertion });
            total += amount;
          });
          const MonthArrear = {
            dolar,
            totalDolar: total
          };
          resolve(MonthArrear);
        } else {
          resolve({ errMonthArrearDolarArray });
        }
      }
    );
  });
};

// Query to get Month Arrear
const getMonthArrear = async month => {
  const monthInArrear = {};
  let total = 0;
  let counter = 0;

  const query = `SELECT payedMonth AS arrearMonth, arrears.transfer, arrears.cash, SUM((arrears.transfer+arrears.cash)/registers.dolarPrice) AS totalBs FROM arrears, registers WHERE MONTH(registers.date) = ${month} AND arrears.idRegister = registers.idRegister`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errMonthArrear, rows) => {
      if (!errMonthArrear) {
        rows.forEach(async row => {
          const { arrearMonth, transfer, cash, totalBs } = row;
          const { dolar, totalDolar } = await getMonthArrearDolarArray(month);

          monthInArrear[arrearMonth] = { arrearMonth, transfer, cash, dolar };
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
        resolve({ errMonthArrear });
      }
    });
  });
};

// Rutas o Endpoints
// 1.-Select arrear http://localhost:3500/api/arrears/[month] - (month: number)
router.get('/arrears/:month', async (req, res) => {
  const { month } = req.params;

  // Query to get Month Arrear
  const { monthInArrear, totalArrear, errMonthArrear } = await getMonthArrear(
    month
  );
  if (errMonthArrear) {
    res.status(400).json({ errMonthArrear });
    return null;
  }

  const arrear = { monthInArrear, totalArrear };
  console.log(arrear);

  res.status(200).json(arrear);
  return res;
});

module.exports = router;
