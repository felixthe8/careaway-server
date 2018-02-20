const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');
const proxy = require('express-http-proxy');
const routes = require('./proxyRoutes');
const session = require('express-session');
const csrf = require('csurf');
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.set('trust proxy', 1) // trust first proxy - only if secure is true for express-session
const MongoStore = require('connect-mongo')(session);

const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
  optionsSuccessStatus: 200
};

// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet()); 

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

const csrfProtection = csrf();
//app.use(csrfProtection);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/', (req, res, next) => {
  console.log("Here");
})
/* app.use('/', (req, res) => {
  const token = req.csrfToken();
  res.locals.csrfToken = token;
  res.header['x-csrf-token'] = token;
  console.log(`The token ${token}`);
  return res.json({ csrfToken : token });
}); */

app.use('/register', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    console.log('here ');
    console.log(req);
    return routes.register;
  } 
}));

app.use('/login', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    return routes.login;
  }
}));

module.exports = app;