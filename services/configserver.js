const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');
const proxy = require('express-http-proxy');
var http = require('http');
const config = require('./config');
const session = require('express-session');
const csrf = require('csurf');
var breached = false;
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
const request = require('request');
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

app.get('*',function(req, res, next) {
  if (breached) {
    res.send({ down : true });
  } else {
    next();
  }
});

app.get('/isBreached',function(req,res) {
  res.send({ down : false }); // ? Shouldn't this send breached? res.send({down:breached})
});

app.use('/breach', function (req,res){   
  var systemAdmin= {
    username:req.body.username,
    password: req.body.password
  }
  request.post({
    url:     'http://localhost:4100/account/api/authentication',
    form:   systemAdmin
  }, function(err,httpResponse,body){ 

      if(JSON.parse(httpResponse.body).accountType === 'system-admin'){
        request('http://localhost:4100/breach', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });
        
         request('http://localhost:4200/breach', function (error, response, body) {
           console.log('error:', error); // Print the error if one occurred and handle it
           console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
         });
        request('http://localhost:4400/breach', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });

        console.log('Account module closed.');
        console.log('Treatment module closed.');
        console.log('Appointment module closed.');

        breached = true;
      
        }
        else{

        }
  });
  res.send('Server has been breached'); 
});

app.use(morgan('dev'));
app.use('/', (req, res, next) => {
  next();
})
/* app.use('/', (req, res) => {
  const token = req.csrfToken();
  res.locals.csrfToken = token;
  res.header['x-csrf-token'] = token;
  console.log(`The token ${token}`);
  return res.json({ csrfToken : token });
}); */


app.use('/registerPatient', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.registerPatient;
  } 
}));

app.use('/registerMed', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.registerMed;
  } 
}));

app.use('/login', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.login;
  }
}));

app.use('/ssoRegisterPatient', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegisterPatient;
  }
}));

app.use('/validate-username', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.validateUsername;
  }
}));

app.get('/security-questions', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.securityQues}${req._parsedOriginalUrl.search}`; 
  }
}));

app.use('/reset-creds', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.resetCreds;
  }
}));

app.use('/ssoRegisterMed', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return config.routes.ssoRegisterMed;
  }
}));

app.get('/get-user', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getUser}${req._parsedOriginalUrl.search}`;
  }
}));

app.get('/get-patients', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getPatients}${req._parsedOriginalUrl.search}`;
  }
}));

app.get('/patient-appointment-info', proxy(config.url.account, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.patientAppointmentInfo}${req._parsedOriginalUrl.search}`
  }
}));

app.use('/createAppt', proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.createAppt;
  }
}));

app.use('/updateAppt', proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.updateAppt;
  }
}));

app.get('/getAppt', proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getAppt}${req._parsedOriginalUrl.search}`;
  }
}));

app.use('/deleteAppt', proxy(config.url.appointment, {
  proxyReqPathResolver: function(req) {
    return config.routes.deleteAppt;
  }
}));



app.use('/returnCode', proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.returnCode}${req._parsedOriginalUrl.search}`; 
  }
}));

app.use('/getDiagnoses', proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getDiagnoses}${req._parsedOriginalUrl.search}`; 
  }
}));

app.use('/getTreatmentmeter', proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getTreatmentmeter}${req._parsedOriginalUrl.search}`; 
  }
}));

app.use('/getTreatmentchecklist', proxy(config.url.treatment, {
  proxyReqPathResolver: function(req) {
    return `${config.routes.getTreatmentchecklist}${req._parsedOriginalUrl.search}`; 
  }
}));


module.exports = app;