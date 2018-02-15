const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');
const proxy = require('express-http-proxy');
const routes = require('./proxyRoutes');

const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200
};

// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet()); 

app.use('/register', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    return routes.register;
  } 
}));

app.use('/login', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    return routes.login;
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

module.exports = app;