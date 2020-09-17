//10.-Crear Backup ----> http://localhost:3000/api/tasks/Backup
//REQUIERE DEPENDENCIA:  npm install mysql-backup
//RECIBE: Ruta Destino donde se guardara el respaldo
router.post('/Backup', (req, res) => {
    let { ruta } = req.body;
    // let direc = "C:/Desktop/"
    const mysqlBackup = require('mysql-backup');
    var fs = require('fs');
    mysqlBackup({
      host: 'localhost',
      user: 'root',
      password: '',
      schema: true,
      data: true,
      database: 'vapersve',
      ifNotExist: true
    }).then(dump => {
      fs.writeFileSync(ruta + '/VapersBackup.sql', dump); //RUTA + NOMBRE DEL ARCHIVO SQL
  
      //console.log(dump);
    });
    res.json({ status: 'ok' });
  });
  
  // 11.-RESTORE ----> http://localhost:3000/api/tasks/Restore
  // RECIBE RUTA DESTINO de donde esta ubicado el respaldo
  router.post('/Restore', (req, res) => {
    const { ruta } = req.body;
    const database = 'vapersve'; // vapersve
  
    const mysqlConnection2 = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });
  
    mysqlConnection2.query(`DROP DATABASE  ${database}`, function(err, result) {
      if (!err) {
        mysqlConnection2.query(
          `CREATE DATABASE  IF NOT EXISTS  ${database};`,
          function(err2, result2) {
            if (result2.affectedRows === 1) {
              const mysql_import = require('mysql-import');
              const importer = new mysql_import({
                host: 'localhost',
                user: 'root',
                password: '',
                database
              });
  
              // IMPORTAR bASE DE DATOS
              importer
                .import(ruta)
                .then(() => {
                  // CREAR CONECCTION
                  const mc = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database
                  });
  
                  // EXTRAER ARRAY DE PROCEDURES
                  const procedures = require('../sql/procedures');
                  let perror = null;
                  let queries = 0;
  
                  // CICLO PARA CREAR CADA UNO DE LOS PROCEDURES
                  procedures.forEach(p => {
                    mc.query(p, function(err4, rs) {
                      if (err4) perror = err4;
                      else queries++;
  
                      if (queries === 12) {
                        res.json({ status: 'ok' });
                      }
                    });
                  });
  
                  if (queries > 12) {
                    res.json({ status: 'error', err1: perror });
                  }
  
                  // SI EN LA CREACION DE ALGUNO HUBO UN ERROR LO DEVUELVE
                })
                .catch(err3 => {
                  res.json({ status: 'error', err2: err3 });
                });
            } else res.json({ status: 'error', err3: err2, result2 });
          }
        );
      } else res.json({ status: 'error', err, result });
    });
  });
  
  // 12.-CREAR DB ----> http://localhost:3000/api/tasks/Restore
  // RECIBE RUTA DESTINO de donde esta ubicado el respaldo
  router.post('/verifyDB', (req, res) => {
    const database = 'vapersve'; // vapersve
  
    const mysqlConnection2 = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
      //database: 'vapersve'
    });
  
    mysqlConnection2.query(
      `CREATE DATABASE  IF NOT EXISTS  ${database};`,
      function(err, result) {
        // IF DATABASE WAS CREATED
        if (result.affectedRows === 1) {
          // CREATE A NEW CONNECTION WITH THE DB
          const mc = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database
          });
  
          // GETTING TABLES AND PROCEDURES ARRAYS OF STRING WITH THE SQL
          const tables = require('../sql/tables');
          const procedures = require('../sql/procedures');
  
          // CREATE COUNTERS TO VALIDATE PROCCESS
          let counter = 0;
          let succes = 0;
  
          // A VARIABLE TO SAVE ERRORS
          let error = {};
  
          // FIRST LOOP WITH TABLE SQL SENTENCES
          tables.forEach(table => {
            // MAKE A QUERY FOR EACH ONE
            mc.query(table, (err, rs) => {
              // FOR EACH LAP COUNTER WILL INCREMENT
              counter++;
  
              // IF OK ONCREMENT SUCCES
              if (!err) {
                succes++;
              } else error = err;
  
              // IF THIS IS THE LAST LAP WILL COMPARE IF ALL
              // THE QUERIES WERE MADE SUCCESSFULY
              if (counter === tables.length) {
                if (succes === tables.length) {
                  // RESET COUNTER TO NEXT LOOP
                  counter = 0;
                  succes = 0;
  
                  // START PROCEDURES LOOP, THE SAME LOGIC THAN BEFORE
                  procedures.forEach(p => {
                    mc.query(p, (err2, rs2) => {
                      counter++;
                      if (!err2) {
                        succes++;
                      } else error = err2;
  
                      if (counter === procedures.length) {
                        if (succes === procedures.length)
                          // IF ALL RIGHT SEND RESPONSE
                          res.json({ status: 'ok' });
                        else res.json({ status: 'error', err: err2 });
                      }
                    });
                  });
                } else res.json({ status: 'error', err: error });
              }
            });
          });
        } else res.json({ status: 'ok' });
      }
    );
  });

module.exports = router;