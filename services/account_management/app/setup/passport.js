const LocalStrategy = require('passport-local').Strategy;
const api = require('@account/app/api/authentication');
const models = require('@account/app/setup');

const pass = {}

pass.authentication = (passport) => (req, res, next) => {
  
  console.log("in passport authentication");
}
module.exports = pass;
