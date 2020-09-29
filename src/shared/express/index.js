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

  app.listen(app.get('port'), () => {
    console.log('server on port 3500');
  });

  module.exports = app;
})();
