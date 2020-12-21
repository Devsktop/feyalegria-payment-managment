const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '192.168.1.13',
  user: 'jhoseph',
  password: '',
  database: 'feyalegria'
});

module.exports = mysqlConnection;
