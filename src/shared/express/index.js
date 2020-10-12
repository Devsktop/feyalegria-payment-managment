/* eslint-disable global-require */
(function() {
  const express = require('express');
  const morgan = require('morgan');
  const cors = require('cors');
  const app = express();

  // Settings
  app.set('port', 3500);

  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // cors
  app.use(cors());

  // Routes
  // app.use('/api/tasks', require('./routes/task.routes'));
  app.use('/api', require('./routes/login'));
  app.use('/api', require('./routes/students'));
  app.use('/api', require('./routes/payments'));
  app.use('/api', require('./routes/advancements'));
  app.use('/api', require('./routes/arrears'));
  app.use('/api', require('./routes/sections'));
  app.use('/api', require('./routes/representatives'));
  app.use('/api', require('./routes/grades'));
  app.use('/api', require('./routes/rates'));
  app.use('/api', require('./routes/products'));

  app.listen(app.get('port'), () => {
    console.log('server on port 3500');
  });

  module.exports = app;
})();
