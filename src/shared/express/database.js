const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'sql10.freemysqlhosting.net',
  user: 'sql10405958',
  password: 'ULqV5I2JpQ',
  database: 'sql10405958'
});

module.exports = mysqlConnection;
