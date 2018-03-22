const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');
var breached = false;
// Allows only one cross origin site
const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  optionsSuccessStatus: 200
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
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/breach', function(req,res){
  // Middleware boolean true
    breached = true;

});
// Makes sure setup, api, and routes are loaded before anything else.
consign({ cwd: 'services' })
  .include('appointment_scheduling/app/setup')
  .then('appointment_scheduling/app/api')
  .then('appointment_scheduling/app/routes')
  .into(app);
module.exports = app;