const express = require('express');
const mysqlConnection = require('../database');

const router = express.Router();

// Rutas o Endpoints

// Verify User Login http://localhost:3500/api/login
router.post('/login', (req, res) => {
  const { user, password } = req.body;
  const query = `SELECT idUser ,username, password from users where username  = '${user}' AND password = '${password}' limit 1;
       `;

  mysqlConnection.query(query, [user, password], (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        const { idUser, username } = rows[0];
        res.status(200).json({ idUser, username });
      } else {
        res.status(200).json({ err: 'no user' });
      }
    } else {
      res.status(404).json({
        err
      });
    }
  });
});

module.exports = router;
