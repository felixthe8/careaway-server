const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('@accountModels/passport')();
const consign = require('consign');

const corsOptions = {
    origin: ['https://careaway.me','http://localhost:8081', 'http://localhost:8085'],
    optionsSuccessStatus: 200,
    credentials: true
};
var breached = false;
// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
// Middleware handle for breach Notification
app.all('*',function(req,res,next){
    if(breached){
    
        res.send({down:true});
        res.end();
        }else{
            next();
        }
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8081");
//     res.header("Access-Control-Allow-Origin", "http://localhost:8085");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
//   });
app.use('/breach', function(req,res){
    //set to true when breach is hit from validated System Admin
    breached = true;
});
app.passport = passport;
// Makes sure setup, api, and routes are loaded before the app.
consign({ cwd: 'services' })
    .include('account_management_service/app/setup')
    .then('account_management_service/app/api')
    .then('account_management_service/app/routes')
    .into(app);

module.exports = app;