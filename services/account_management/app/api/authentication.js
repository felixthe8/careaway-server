const api = {};

api.register = () => (req, res) => {
    console.log('in register');
}
api.login = () => (req, res) => {
    console.log('in login');
}

module.exports = api;