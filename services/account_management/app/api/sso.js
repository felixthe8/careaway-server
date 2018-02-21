var CryptoJS = require('crypto-js');

const api = {};

api.ssoRegistration = (UserRepo, DB) => (req, res) => {
    console.log("HERE")
    const username = req.body.username;
    const password = req.body.password;
    const securityQ1 = req.body.securityQ1;
    const securityQ2 = req.body.securityQ2;
    const securityQ3 = req.body.securityQ3;
    const securityA1 = req.body.securityA1;
    const securityA2 = req.body.securityA2;
    const securityA3 = req.body.securityA3;
    const salt = req.body.salt;
    const saltA1 = req.body.saltA1;
    const saltA2 = req.body.saltA2;
    const saltA3 = req.body.saltA3;
    console.log(username);
    console.log(password);
    DB.then(database => {
        var userRepo = new UserRepo(database);
        var sQ = [ 
            new Security(securityQ1,securityA1),
            new Security(securityQ2,securityA2),
            new Security(securityQ3,securityA3),
        ];
        var identifier = new identifier(salt, saltA1, saltA2, saltA3);
        var newUser = new User(username,password, {}, {},sQ ,identifier);
        userRepo.Create(newUser);
        res.json({success: true});
    });
};

api.ssoLogin = (UserRepo, DB) => (req, res) => {

};


api.ssoResetPassword= (UserRepo, DB) => (req, res) => {
    
};




module.exports = api;