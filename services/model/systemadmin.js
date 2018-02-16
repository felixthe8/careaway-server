function SystemAdmin () {
    this.role = 'system-admin';
}

SystemAdmin.prototype = Object.create(user.prototype);

module.exports = SystemAdmin;