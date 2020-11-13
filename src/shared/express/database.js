const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
<<<<<<< HEAD
  host: '192.168.0.17',
  user: 'jhoseph',
=======
  host: 'localhost',
  user: 'root',
>>>>>>> 3e97067000d5deedf3ad31238266a48fd1c89348
  password: '',
  database: 'feyalegria'
});

module.exports = mysqlConnection;
