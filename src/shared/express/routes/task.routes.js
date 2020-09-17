/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const mysql = require('mysql');
const path = require('path');

//Rutas o Endpoints

//CRUD PRODUCTO

//1.-Añadir Producto http://localhost:3000/api/tasks/producto
router.post('/producto', (req, res) => {
  const { desc, precio, stock, cat, precio_c } = req.body;
  const query = ` INSERT INTO producto (Descripcion_P, Precio_P, Stock, Categoria, Precio_Compra) VALUES ( ?, ?, ?, ?, ?);
     `;

  mysqlConnection.query(
    query,
    [desc, precio, stock, cat, precio_c],
    (err, rows) => {
      if (!err) {
        res.json({
          status: 'ok',
          id: rows.insertId
        });
      } else {
        res.json({
          status: 'error',
          err
        });
      }
    }
  );
});

//2.-Ver Producto http://localhost:3000/api/tasks/producto
router.get('/producto', (req, res) => {
  mysqlConnection.query('SELECT * from producto', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//3.-Borrar Producto ---> http://localhost:3000/api/tasks/producto
router.delete('/producto', (req, res) => {
  const { id } = req.body;
  const query = `  DELETE FROM producto WHERE producto.Id_Producto =(?);
     `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'ok' });
    } else {
      res.json({ status: 'error' });
    }
  });
});

//4.- Actualizar PRODUCTO---->http://localhost:3000/api/tasks/actproducto
router.post('/actproducto', (req, res) => {
  const { cp, des, pre, cant, cat, pre_com } = req.body;
  const query = ` CALL ActProducto(?, ?, ?, ?, ?,?);
     `;

  mysqlConnection.query(
    query,
    [cp, des, pre, cant, cat, pre_com],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          status: 'ok'
        });
      } else {
        res.json({
          status: 'error',
          err
        });
      }
    }
  );
});

// 5.-Actualizar Dolar----> http://localhost:3000/api/tasks/actdolar
router.post('/actdolar', (req, res) => {
  const { Dolar } = req.body;
  const query = `  CALL ActDolar(?);
     `;

  mysqlConnection.query(query, [Dolar], err => {
    if (!err) {
      res.json({
        status: 'ok'
      });
    } else {
      res.json({
        status: 'error'
      });
    }
  });
});

//6.-Filtrar Resumen de Venta por Fecha----> http://localhost:3000/api/tasks/ResumenFecha
//Recibe: Fechas Desde Hasta
//Retorna: Resumen de Venta filtrada por las fechas ingresadas
router.post('/ResumenFecha', (req, res) => {
  const { Desde, Hasta } = req.body;
  const query = `  CALL Filtrar_Fecha(?,?);
     `;

  mysqlConnection.query(query, [Desde, Hasta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      //res.json({Status: "RESUMEN DE VENTAS Desde:"+Desde+"-Hasta:"+Hasta});
    } else {
      console.log(err);
    }
  });
});

//7.-Filtrar Resumen de Venta por Fecha----> http://localhost:3000/api/tasks/RegistroFecha
//Recibe: Fechas Desde Hasta
//Retorna: Resumen de Venta filtrada por las fechas ingresadas
router.post('/RegistroFecha', (req, res) => {
  const { Desde, Hasta } = req.body;
  const query = `  CALL Facturas_Fecha(?,?);
     `;

  mysqlConnection.query(query, [Desde, Hasta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
      //res.json({Status: "REGISTRO DEL DIA Desde:"+Desde+"-Hasta:"+Hasta});
    } else {
      console.log(err);
    }
  });
});

//8.-Carrito de venta http://localhost:3000/api/tasks/carritoventa/////////////////////////////////////////////////////
router.post('/carritoventa', (req, res) => {
  let IDD = 0;
  // producst [ {id,cant}, ....]
  const { products, mt, obv } = req.body;
  const query = ` CALL Agregar_Venta(?, ?, ?);`;

  const query2 = ` CALL Ver_Registro(?);`;
  const dt = ` INSERT INTO resumen_venta ( Total_Venta, Total_Bs, Metodo_Pago, Observacion, Fecha, Total_Neto)  VALUES ( ?, ?, ?, ?, CURDATE(),?);
`;

  // Llamado#1 Base de Datos INSERT Detale_Venta + Procedure Agregar Venta
  mysqlConnection.query(dt, [0, 0, mt, obv, 0], (err, rows) => {
    if (!err) {
      IDD = rows.insertId;

      // LLAMADO #2 CON CICLO FOR Y MULTIPLES INSERTS
      products.forEach(({ id, cant }) => {
        mysqlConnection.query(query, [id, cant, IDD], () => {});
      });

      // LLAMADO#3  PARA RETORNAR ID Y TOTAL_NETO  de Resumen de ventas
      mysqlConnection.query(query2, IDD, (err2, rows, fields) => {
        if (!err2) {
          const netTotal = rows[0][0].Total_Neto;
          res.json({
            status: 'ok',
            id: IDD,
            netTotal
          });
        } else {
          console.log(err2);
        }
      });
    } else {
      res.json({
        status: 'error'
      });
    }
  });
}); //carritoventa

//9.-Ver Ventas ----> http://localhost:3000/api/tasks/Ver_Venta
//Recibe: Id de registro de ventas
// Retorna:  Id_Venta,  Id_ResumenVenta,	Descripcion_P,	Precio_P,	Cantidad,	Total---> DE LAS VENTAS ASOCIADAS AL REGISTRO DE VENTAS

router.post('/Ver_Venta', (req, res) => {
  let { id } = req.body;
  const query = `  CALL Ver_Venta(?);
   `;

  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      const userdata = rows[0];
      res.json({
        status: 'ok',
        userdata
      });
    } else {
      res.json({
        status: 'error'
      });
    }
  });
});

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
