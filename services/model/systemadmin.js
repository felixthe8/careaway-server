var user = require('./user');
var security = require('./security');

function SystemAdmin (username, password) {
    this.username = user.username || '';
    this.password = user.password || '';
}

SystemAdmin.prototype = Object.create(User.prototype);