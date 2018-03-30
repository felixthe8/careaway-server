const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');
const proxy = require('express-http-proxy');
var http = require('http');
const config = require('./config')
const session = require('express-session');
const request = require('request');
const csrf = require('csrf');
const cookieParser = require('cookie-parser');
const database = require('@dataAccess/db_connection');
const tokenRepository = require('@dataAccess/csrf_token_repository');
var breached = false;
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
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
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

app.use(cookieParser());
const passportConfig = require('./passport');
const passport = passportConfig.run();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/logout', passportConfig.logout);


function CsrfValidation(req,res,next){
  new database().Connect().then(database => {
    var tokens = new csrf();
    var tRepo = new tokenRepository(database);
    var csrfToken = req.headers['x-csrf-token'];
    if(csrfToken){
      tRepo.findExistingToken(csrfToken).then(function(value){
        if (!tokens.verify(value.token.secret, value.token.value)) {
          console.log('BAD CRSF Token');
          res.statusCode(400);
          res.end();
        } else {
          next();
          }
        }, function(error){
          console.log('BAD CRSF Token');
          res.statusCode(400);
          res.end();
        });
      }
      else{
        console.log('BAD CRSF Token');
        res.statusCode(400);
        res.end();
      }
  });
};

function createCSRFToken (req,res,next){
    new database().Connect().then(database => {
    var tokens = new csrf();
    var tRepo = new tokenRepository(database);
    var secret = tokens.secretSync();
    var token = tokens.create(secret);
    tRepo.addToken({"value" : token, "secret" : secret});
    req.csrfToken = token;
    next();
  });
};

app.get('*',function(req, res, next) {
  // Middleware handler for breach
  if (breached) {
    res.send({ down : true });
  } else {
    next();
  }
});

app.get('/isBreached', createCSRFToken, function(req,res) {
  // Middleware handle for breach for homepage
  res.send({ down : false, 'csrfToken' : req.csrfToken }); // ? Shouldn't this send breached? res.send({down:breached})
});

app.use('/breach',CsrfValidation, function (req,res){
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
        // Set MiddleWare Boolean to true
        breached = true;

        }
  });
  res.send('Server has been breached');
});

app.use(morgan('dev'));
app.use('/', (req, res, next) => {
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/registerPatient',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.registerPatient;
  }
}));

app.use('/Sso/Registration', proxy(config.url.account,{
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegistration;
  }
}));

app.use('/Sso/Login', proxy(config.url.account,{
  proxyReqPathResolver: function(req) {
    return config.routes.ssoLogin;
  }
}));

app.use('/Sso/ResetPassword', proxy(config.url.account,{
  proxyReqPathResolver: function(req) {
    return config.routes.ssoResetPassword;
  }
}));
app.use('/registerMed',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.registerMed;
  }
}));

app.use('/login',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.login;
  }
}));

app.use('/ssoRegisterPatient', CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegisterPatient;
  }
}));

app.use('/validate-username',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.validateUsername;
  }
}));

app.use('/validate-answers',CsrfValidation,  proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.validateAnswers;
  }
}));

app.get('/security-questions',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.securityQues}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/reset-creds', CsrfValidation,proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.resetCreds;
  }
}));

app.use('/ssoRegisterMed', CsrfValidation,proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegisterMed;
  }
}));

app.use(passportConfig.isAuthenticated);
app.get('/get-user', CsrfValidation,proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getUser}${req._parsedOriginalUrl.search}`;
  }
}));

app.get('/get-patients',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getPatients}${req._parsedOriginalUrl.search}`;
  }
}));

app.get('/patient-appointment-info',CsrfValidation, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.patientAppointmentInfo}${req._parsedOriginalUrl.search}`
  }
}));

app.get('/getLoginInfo', createCSRFToken, proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getLoginInfo}${req._parsedOriginalUrl.search}&csrfToken=${req.csrfToken}`;
  }
}));

app.use('/createAppointment',CsrfValidation, proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.createAppt;
  }
}));

app.use('/updateAppointment',CsrfValidation, proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.updateAppt;
  }
}));

app.get('/getAppt', CsrfValidation,proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getAppt}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/deleteAppt', CsrfValidation,proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.deleteAppt;
  }
}));

app.use('/returnCode',CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.returnCode}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/getDiagnoses',CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getDiagnoses}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/createTreatment', CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return config.routes.createTreatment;
  }
}));

app.use('/createTreatmentMeter', CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return config.routes.createTreatmentMeter;
  }
}));

app.use('/createTreatmentChecklist', CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return config.routes.createTreatmentChecklist;
  }
}));

app.use('/deleteTreatment', CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return config.routes.deleteTreatment;
  }
}));

app.use('/getTreatment', CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getTreatment}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/getSingleDiagnosis', CsrfValidation,proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getSingleDiagnosis}?username=${req.query.username}&medicalcode=${req.query.medicalcode}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`;
  }
}));

app.use('/getTreatmentMeter',CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getTreatmentMeter}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/getPatientTreatment',CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.queryWidgets}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/updatePatientTreatment',CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return config.routes.patientUpdate;
  }
}));

app.use('/getDiagnosisList', CsrfValidation,proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getDiagnosisList}`;
  }
}));

app.use('/getSingleTreatmentmeter',CsrfValidation, proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getSingleTreatmentmeter}?username=${req.query.username}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`;
  }
}));

app.use('/getPatientUserNames', CsrfValidation,proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getPatientUserNames}?medicalcode=${req.query.medicalcode}`;
  }
}));

app.use('/getTreatmentChecklist', CsrfValidation,proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getTreatmentChecklist}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/getSingleTreatmentchecklist', CsrfValidation,proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getSingleTreatmentchecklist}?username=${req.query.username}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`;
  }
}));

module.exports = app;
