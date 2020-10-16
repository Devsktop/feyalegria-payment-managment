const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '10.0.1.50',
  user: 'jhoseph',
  password: '',
  database: 'feyalegria'
});

module.exports = mysqlConnection;
