var security = require('./security');
var patient = require('./patient');
var mp = require('./medicalprofessional');
var admin = require('./systemadmin');
var identifier = require('./identifier');

function User (username, password, role, security, identifier) {
    this.username = username || '';
    this.password = password || '';
    this.accountType = accountType || {};
    this.security = security || [];
    this.identifier = identifier || [];
}

module.exports = User;