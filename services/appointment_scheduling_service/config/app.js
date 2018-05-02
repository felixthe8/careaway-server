const express = require('express');
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const consign = require('consign');

var breached = false;

// Options to allow only one cross origin site.
const corsOptions = {
  origin: ['https://careaway.me','http://localhost:8081','http://localhost:8085'],
  optionsSuccessStatus: 200,
  credentials: true
};

app.all('*',function(req,res,next){
// Middleware for breach notifcation
  if(breached){
      res.send({down:true});
      res.end();
      }else{
      next();
    }
});

// Allows one site (localhost:8081) from a different origin in.
app.use(cors(corsOptions));

// Security header.
app.use(helmet());

// Parses request bodies (either url encoded or json).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logger for requests.
app.use(morgan('dev'));

app.use('/breach', function(req,res){
  // Middleware boolean true
    breached = true;

});

// Makes sure setup, api, and routes are loaded before the application.
consign({ cwd: 'services' })
  .include('appointment_scheduling_service/app/setup')
  .then('appointment_scheduling_service/app/api')
  .then('appointment_scheduling_service/app/routes')
  .into(app);

module.exports = app;