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
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.all('*',function(req,res,next){
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
  breached = true;
 });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Makes sure setup, api, and routes are loaded before anything else .
consign({ cwd: 'services' })
  .include('treatment_management/app/setup')
  .then('treatment_management/app/api')
  .then('treatment_management/app/routes')
  .into(app);

module.exports = app;