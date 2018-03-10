const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const passport = require('passport');
const consign = require('consign');

const corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200
};

// Allows only one cross origin site.
app.use(cors(corsOptions));
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session())
app.use(morgan('dev'));



// Makes sure setup, api, and routes are loaded before the app.
consign({ cwd: 'services' })
    .include('account_management/app/setup')
    .then('account_management/app/api')
    .then('account_management/app/routes')
    .into(app);

module.exports = app;