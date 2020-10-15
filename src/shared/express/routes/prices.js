const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select monthRegisters http://localhost:3500/api/prices
router.get('/prices', async (req, res) => {
  // Query to get prices
  const { prices, errGetPrices } = await getPrices();

  if (errGetPrices) {
    res.status(400).json({ errGetPrices });
    return null;
  }

  console.log(prices);

  res.status(200).json(prices);

  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //

// Query to get monthRegisters
const getPrices = async () => {
  const prices = {};
  const query = `SELECT idRate, price, type FROM rates;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGetPrices, rows) => {
      rows.forEach(row => {
        prices[row.idRate] = { ...row };
      });
      if (!errGetPrices) {
        resolve({ prices });
      } else {
        resolve({ errGetPrices });
      }
    });
  });
};

module.exports = router;
