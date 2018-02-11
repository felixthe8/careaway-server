var user = require('./user');
var security = require('./security');

function SystemAdmin (username, password) {
    user.username = username;
    user.password = password;

    this.username = user.username || '';
    this.password = user.password || '';
}

SystemAdmin.prototype = Object.create(User.prototype);

module.exports = SystemAdmin;