function User (username,password) {
    this.username = username || '';
    this.password = password || '';
}

User.prototype.ResetPassword = function (newpassword) {
    this.password = newpassword;
}

module.exports = User;