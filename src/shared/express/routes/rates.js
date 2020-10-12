const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select rates http://localhost:3500/api/rates - ?type=string
router.get('/rates', async (req, res) => {
  const { type } = req.query;
  // Query to get Rates
  const { price, paymentConcepts, errGetRates } = await getRates(type);

  if (errGetRates) {
    res.status(400).json({ errGetRates });
    return null;
  }

  if (type === 'inscription') {
    const join = {
      price,
      paymentConcepts
    };
    res.status(200).json(join);
  } else {
    const monthlyPayment = {
      price,
      paymentConcepts
    };
    res.status(200).json(monthlyPayment);
  }

  return res;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get Rates
const getRates = async type => {
  const paymentConcepts = {};
  const query = `SELECT rates.price, paymentsconcepts.idPaymentsConcept AS idConcept, paymentsconcepts.name AS concept, paymentsconcepts.price AS conceptPrice FROM rates, paymentsconcepts WHERE rates.type = ${type} AND rates.idRate = paymentsconcepts.idRate;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetRates, rows) => {
      if (!errGetRates) {
        const { price } = rows[0];
        rows.forEach(row => {
          paymentConcepts[row.idConcept] = { ...row };
        });
        resolve({ price, paymentConcepts });
      } else {
        resolve({ errGetRates });
      }
    });
  });
};

module.exports = router;
