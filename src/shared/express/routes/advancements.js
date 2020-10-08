const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

const getCurrentMonthAdvancementDolarArray = async monthAdvance => {
  const dolar = [];

  const query = `SELECT concat(MIN(day(registers.date)) , ' - ', MAX(day(registers.date))) AS rango, sum(advancements.dolars) AS amount, registers.dolarPrice AS exchange, (sum(advancements.dolars) * registers.dolarPrice) AS convertion FROM registers, advancements WHERE payedMonth = ? AND advancements.idRegister = registers.idRegister GROUP BY registers.dolarPrice;`;

  return new Promise(resolve => {
    let total = 0;
    let rangeSplit = [];
    let range = '';
    mysqlConnection.query(
      query,
      [monthAdvance],
      (errCurrentMonthAdvancementDolarArray, rows) => {
        if (!errCurrentMonthAdvancementDolarArray) {
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
const getCurrentMonthAdvancement = async month => {
  const monthInAdvance = {};
  let total = 0;
  let counter = 0;

  const query = `SELECT payedMonth AS monthAdvance, advancements.transfer, advancements.cash, SUM((advancements.transfer+advancements.cash)/registers.dolarPrice) AS totalBs FROM advancements, registers WHERE MONTH(registers.date) = ${month} AND advancements.idRegister = registers.idRegister`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errCurrentMonthAdvancement, rows) => {
      if (!errCurrentMonthAdvancement) {
        rows.forEach(async row => {
          const { monthAdvance, transfer, cash, totalBs } = row;
          const {
            dolar,
            totalDolar
          } = await getCurrentMonthAdvancementDolarArray(monthAdvance);

          monthInAdvance[monthAdvance] = {
            month: monthAdvance,
            transfer,
            cash,
            dolar
          };
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

// Rutas o Endpoints
// 1.-Select advancement http://localhost:3500/api/advancement/[month] - (month: number)
router.get('/advancement/:month', async (req, res) => {
  const { month } = req.params;

  // Query to get Month Advancement
  const {
    monthInAdvance,
    total,
    errCurrentMonthAdvancement
  } = await getCurrentMonthAdvancement(month);
  if (errCurrentMonthAdvancement) {
    res.status(400).json({ errCurrentMonthAdvancement });
    return null;
  }

  const advancements = { monthInAdvance, total };

  res.status(200).json(advancements);
  return res;
});

module.exports = router;
