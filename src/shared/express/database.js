const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '192.168.0.17',
  user: 'jhoseph',
  password: '',
  database: 'feyalegria'
});

module.exports = mysqlConnection;
