var CryptoJS = require('crypto-js');

const api = {};

api.ssoRegistration = (UserRepo, DB) => (req, res) => {
    
}

api.ssoLogin = (UserRepo, DB) => (req, res) => {
     console.log("Test");
     res.json({"HELL YEA":"HEYY "});
}

api.ssoSendPassword = (UserRepo, DB) => (req, res) => {
    console.log("Test");
}

api.ssoReceivePassword = (UserRepo, DB) => (req, res) => {
    console.log("Test");
}




module.exports = api;