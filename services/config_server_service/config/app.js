const express = require('express');
const app = express();
// npm library modules
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const consign = require('consign');
const morgan = require('morgan'); // logger
const cookieParser = require('cookie-parser');

const config = require('@configServerConfig')
const csrf = require('../app/api/csrfMiddleware');

// breach stuff
const request = require('request'); // For breaches
var breached = false;

// For cross origin requests (client)
const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cookieParser());

// Express session
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.set('trust proxy', 1) // trust first proxy - only if secure is true for express-session
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'thesecret',
  resave: false,
  saveUninitialized: false,
  name: 'sessionID',
  cookie: {
    path: '/',
    proxy: true,
    expires: expiryDate,
    httpOnly: false,
    secure: false
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/test',
  })
}));

// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

// Sets headers to allow cross origin site (client)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// What is this used for??? Why a wildcard???
app.get('*',function(req, res, next) {
  // Middleware handler for breach
  if (breached) {
    res.send({ down : true });
  } else {
    next();
  }
});

app.get('/isBreached', csrf.createCSRFToken, function(req,res) {
  // Middleware handle for breach for homepage
  res.send({ down : false, 'csrfToken' : req.csrfToken }); // ? Shouldn't this send breached? res.send({down:breached})
});



app.use('/breach', function (req,res){
  // Create System admin from response
  const systemAdmin = {
    username:req.body.username,
    password: req.body.password
  }
  // Use request module to validate System Admin
  request.post({
    url:     config.url.accountValidation,
    form:   systemAdmin
  }, function(err,httpResponse,body){
      // Check if valid system admin
      if(JSON.parse(httpResponse.body).accountType === 'system-admin'){
        // Close all modules
        request(config.routes.accountBreach, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });

        request(config.routes.appointmentBreach, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });

        request(config.routes.treatmentBreach, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });

        request(config.routes.feedbackBreach, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });

        request(config.routes.mail_service, function(error, response, body){
            console.log('error', error);
            console.log('statusCode', response && response.statusCode);
        });
        
        // Set MiddleWare Boolean to true
        breached = true;

        }
  });
  res.send('Server has been breached');
});

app.use(morgan('dev'));

// Makes sure setup, api, and routes are loaded before the app.
consign({ cwd: 'services' })
  .include('config_server_service/app/setup')
  .then('config_server_service/app/api')
  .then('config_server_service/app/routes')
  .into(app);

module.exports = app;
