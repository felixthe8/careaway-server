const express = require('express');
const app = express();
// npm library modules
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser'); 
const session = require('express-session');
const consign = require('consign');
const morgan = require('morgan'); // logger
const cookieParser = require('cookie-parser');
const dbConnection = require('@dataAccess/db_connection');
const UserRepo = require('@dataAccess/user_repository');
const CryptoJs = require('crypto-js');

const config = require('@configServer/app/setup/config.js');

const csrf = require('../app/api/csrfMiddleware');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// breach stuff
const request = require('request'); // For breaches
var breached = false;

// For cross origin requests (client)
const corsOptions = {
  origin: ['https://careaway.me','http://localhost:8081', 'http://localhost:8085'],
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
    url: 'mongodb://mongo:27017/test',
  })
}));

// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());


app.get('*',function(req, res, next) {
  // Middleware handler for breach
  if (breached) {
    res.send({ down : true });
  } else {
    next();
  }
});
app.get('/test', (req, res) => {
  res.json({Success: true});
})
app.get('/isBreached', csrf.createCSRFToken, function(req,res) {
  // Middleware handle for breach for homepage
  res.send({ down : false, 'csrfToken' : req.csrfToken }); 
});



app.post('/breach', function (req,res,next){
  // Create System admin from response
  const  username=req.body.username;
  const  password=req.body.password;

  new dbConnection().Connect().then(function(db){
    const repo = new UserRepo(db);
      repo.FindUser(username).then(function(value){
        var queriedUser = value.User;
          if (queriedUser.length === 0) {
            // user was not found
            return done(null, false, {error: 'User does not exist.'});
          } else {

            // user was found
            queriedUser = queriedUser[0];
            // hash password from request and compare with hashed password in db
            const passHashed = CryptoJs.HmacSHA256(password,queriedUser.identifier.salt).toString();

            if (passHashed === queriedUser.password) { 

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
              // Set MiddleWare Boolean to true
              breached = true;
              res.send('Server has been breached');
              next();
            } else {
              res.statusCode(401);
              res.end();
              next();
            }
          }
      })
  })
  
  
});

app.use(morgan('dev'));

// Makes sure setup, api, and routes are loaded before the app.
consign({ cwd: 'services' })
  .include('config_server_service/app/setup')
  .then('config_server_service/app/api')
  .then('config_server_service/app/routes')
  .into(app);

module.exports = app;
