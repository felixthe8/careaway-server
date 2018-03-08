const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');
const proxy = require('express-http-proxy');
const config = require('./config');
const session = require('express-session');
const csrf = require('csurf');
var breached = false;
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.set('trust proxy', 1) // trust first proxy - only if secure is true for express-session
const MongoStore = require('connect-mongo')(session);
const corsOptions = {
  origin: 'http://localhost:8081',
 
  optionsSuccessStatus: 200
};

// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet()); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
app.get('*',function(req,res,next){
  if (breached) {
      res.send({down:true});
  } else {
      next();
  }
  
});
app.get('/isBreached',function(req,res){
  res.send({down:false});
});

app.post('/breach', function (req,res){   
  breached = true;
  res.send('Server has been breached');
});

app.use(morgan('dev'));
app.use('/', (req, res, next) => {
  console.log("Here");
  next();
})
/* app.use('/', (req, res) => {
  const token = req.csrfToken();
  res.locals.csrfToken = token;
  res.header['x-csrf-token'] = token;
  console.log(`The token ${token}`);
  return res.json({ csrfToken : token });
}); */


app.use('/registerPatient', proxy(config.ports.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.registerPatient;
  } 
}));

app.use('/registerMed', proxy(config.ports.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.registerMed;
  } 
}));

app.use('/login', proxy(config.ports.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.login;
  }
}));

app.use('/ssoRegisterPatient', proxy(config.ports.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegisterPatient;
  }
}));

app.use('/validate-username', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    return routes.validateUsername;
  }
}));

app.use('/security-questions', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    return `${routes.securityQues}?username=${req.query.username}`; 
  }
}));

app.use('/reset-creds', proxy('localhost:4100', {
  proxyReqPathResolver: function(req) {
    return routes.resetCreds;
  }
}));

app.use('/ssoRegisterMed', proxy(config.ports.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegisterMed;
  }
}));

app.use('/createAppt', proxy(config.ports.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.createAppt;
  }
}));

app.use('/updateAppt', proxy(config.ports.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.updateAppt;
  }
}));

app.use('/getAppt', proxy(config.ports.appointment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getAppt}${req.query}`;
  }
}));

app.use('/updateApptStatus', proxy(config.ports.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.updateApptStatus;
  }
}));



module.exports = app;