const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');

// Allows only one cross origin site
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(morgan('dev'));

// Makes sure setup, api, and routes are loaded before anything else.
consign({ cwd: 'services' })
  .include('appointment_scheduling/app/setup')
  .then('appointment_scheduling/app/api')
  .then('appointment_scheduling/app/routes')
  .into(app);
module.exports = app;