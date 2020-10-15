const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints
// 1.-Select rates http://localhost:3500/api/rates
router.get('/rates', async (req, res) => {
  // Query to get Rates
  const { rates, errGetRates } = await getRates();

  if (errGetRates) {
    res.status(400).json({ errGetRates });
    return null;
  }

  res.status(200).json(rates);

  return null;
});

// ----------------------------- FUNCTIONS ----------------------------- //
// Query to get Rates
const getRates = async () => {
  const rates = {};
  const query = `SELECT rates.idRate, rates.type, rates.price FROM rates`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async (errGetRates, rows) => {
      if (!errGetRates) {
        // Query to get all paymentConcepts
        const { paymentConcepts } = await getPaymentsConcepts();

        // loop for each rate
        rows.forEach(row => {
          const concepts = {};
          const conceptsKeys = Object.keys(paymentConcepts);

          // For each rate filter those payment concepts that belong to it
          conceptsKeys.forEach(key => {
            if (paymentConcepts[key].idRate === row.idRate)
              concepts[key] = { ...paymentConcepts[key] };
          });

          // Constructing rates object
          rates[row.idRate] = {
            ...row,
            paymentConcepts: concepts
          };
        });

        resolve({ rates });
      } else {
        resolve({ errGetRates });
      }
    });
  });
};

// Query to get paymentsConcepts
const getPaymentsConcepts = async () => {
  const paymentConcepts = {};
  const query = `SELECT paymentsconcepts.idPaymentsConcept AS idConcept, paymentsconcepts.name AS concept, paymentsconcepts.price AS conceptPrice, paymentsconcepts.idRate FROM rates, paymentsconcepts WHERE rates.idRate = paymentsconcepts.idRate;`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errGetPaymentsConcepts, rows) => {
      if (!errGetPaymentsConcepts) {
        rows.forEach(row => {
          paymentConcepts[row.idConcept] = { ...row };
        });
        resolve({ paymentConcepts });
      } else {
        resolve({ errGetPaymentsConcepts });
      }
    });
  });
};

module.exports = router;
