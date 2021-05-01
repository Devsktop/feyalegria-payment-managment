const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'freedb.tech',
  user: 'freedbtech_feyalegria',
  password: '1234',
  database: 'freedbtech_feyalegria'
});

module.exports = mysqlConnection;
