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

// 2.-Update rate http://localhost:3500/api/updateRate
router.post('/updateRate', async (req, res) => {
  const { rate, deleted } = req.body;
  // Query to update Rate
  const { errUpdRate } = await updRate(rate, deleted);

  if (errUpdRate) {
    res.status(400).json({ errUpdRate });
    return null;
  }

  res.status(200).json({ rate, status: 200 });

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
        console.log(paymentConcepts);
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
  const query = `SELECT paymentsconcepts.idPaymentsConcept AS idConcept, paymentsconcepts.name AS concept, paymentsconcepts.price AS conceptPrice, paymentsconcepts.idRate FROM rates, paymentsconcepts WHERE rates.idRate = paymentsconcepts.idRate AND paymentsconcepts.deleted = false;`;

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

// Query to update rate
const updRate = async (rate, deleted) => {
  const { idRate, price, type, paymentConcepts } = rate;
  const query = `UPDATE rates SET price = ${price} where idRate = ${idRate} AND type = "${type}";`;

  return new Promise(resolve => {
    mysqlConnection.query(query, async errUpdRate => {
      if (!errUpdRate) {
        // Check if deleted object is empty
        if (deleted.length > 0) {
          deleted.forEach(async id => {
            // Query to delete paymentConcept
            console.log(id);
            await deletePaymentConcept(id);
          });
        }

        // Get array of keys of paymentConcepts
        const paymentConceptsKeys = Object.keys(paymentConcepts);

        // forEach to iterate with each individual paymentConcept
        paymentConceptsKeys.forEach(async paymentConceptsKey => {
          // Verify if idConcept is positive ('+ = Update', '- = Delete')
          if (paymentConcepts[paymentConceptsKey].idConcept > 0) {
            // Query to update paymentConcept
            await updPaymentConcept(paymentConcepts[paymentConceptsKey]);
          } else {
            // Query to insert paymentConcept
            await addPaymentConcept(paymentConcepts[paymentConceptsKey]);
          }
        });

        // Get new paymentConcepts
        const newPaymentConcepts = await getPaymentConcepts(idRate);
        // Construction of new rate object
        const newRate = {
          idRate,
          price,
          type,
          paymentConcepts: newPaymentConcepts
        };
        resolve({ newRate });
      } else {
        resolve({ errUpdRate });
      }
    });
  });
};

// Query to update paymentConcept
const updPaymentConcept = async paymentConcept => {
  const { concept, conceptPrice, idConcept, idRate } = paymentConcept;
  const newPaymentConcept = {};
  const query = `UPDATE paymentsconcepts SET name = "${concept}", price = ${conceptPrice} WHERE idPaymentsConcept = ${idConcept} AND idRate = ${idRate}`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdPaymentsConcepts => {
      if (!errUpdPaymentsConcepts) {
        newPaymentConcept[idConcept] = {
          idConcept,
          concept,
          conceptPrice,
          idRate
        };
        resolve(newPaymentConcept);
      } else {
        resolve({ errUpdPaymentsConcepts });
      }
    });
  });
};

// Query to add paymentConcept
const addPaymentConcept = async paymentConcept => {
  const { concept, conceptPrice, idRate } = paymentConcept;
  const query = `INSERT INTO paymentsconcepts (name, price, idRate) VALUES ("${concept}", ${conceptPrice}, ${idRate})`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errAddPaymentsConcept => {
      if (!errAddPaymentsConcept) {
        resolve({ status: 200 });
      } else {
        resolve({ errAddPaymentsConcept });
      }
    });
  });
};

// Query to delete paymentConcept
const deletePaymentConcept = async id => {
  console.log(id);
  const query = `UPDATE paymentsconcepts SET deleted = true WHERE idPaymentsConcept = ${id}`;

  return new Promise(resolve => {
    mysqlConnection.query(query, errUpdPaymentsConcepts => {
      if (!errUpdPaymentsConcepts) {
        resolve({ status: 200 });
      } else {
        resolve({ errUpdPaymentsConcepts });
      }
    });
  });
};

// Query to get new paymentConcepts
const getPaymentConcepts = async idRate => {
  const newPaymentConcepts = {};
  const query = `SELECT idPaymentsConcept AS idConcept, name AS concept, paymentsconcepts.price AS conceptPrice, paymentsconcepts.idRate FROM paymentsConcepts LEFT JOIN rates ON rates.idRate = ${idRate} WHERE deleted = false`;

  return new Promise(resolve => {
    mysqlConnection.query(query, (errUpdPaymentsConcepts, rows) => {
      if (!errUpdPaymentsConcepts) {
        rows.forEach(row => {
          newPaymentConcepts[row.idConcept] = { ...row };
        });
        resolve(newPaymentConcepts);
      } else {
        resolve({ errUpdPaymentsConcepts });
      }
    });
  });
};

// 1.-Select rates http://localhost:3500/api/rates
router.get('/globals', async (req, res) => {
  // Query to get RaECT idPaymentsConcept AS idConcept, name AS concept, paymentsconcepts.price AS conceptPrice, paymentsconcepts.idRate FROM paymentsConcepts LEFT JOIN rates ON rates.idRate = ${idRate} WHERE deleted = false`;
  const query = `SELECT actualMonth FROM globals`;

  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      const actualMonth = rows[0];
      res.status(200).json(actualMonth);
    } else {
      res.status(500).json({});
    }
  });
});

module.exports = router;
