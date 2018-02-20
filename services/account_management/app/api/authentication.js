
var CryptoJS = require('crypto-js');

const api = {};

api.login = (UserRepo, DB) => (req, res) => {
    // grab username and password from body
    const username = req.body.username;
    const password = req.body.password;
    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                queriedUser = queriedUser[0];
                const passHashed = CryptoJS.HmacSHA256(password,queriedUser.identifier.salt).toString();
                if (passHashed === queriedUser.password) {
                    res.json({success: true, accountType: queriedUser.accountType.role});
                } else {
                    res.json({error: 'Wrong password.'})
                }
            }
        });
    });
}

api.validateUsername = (UserRepo, DB) => (req, res) => {
    const username = req.body.username;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                res.json({success: true});
            }
            
        });
    });
}

api.securityQs = (UserRepo, DB) => (req, res) => {
    const username = req.query.username;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                queriedUser = queriedUser[0];
                var userSecurity = queriedUser.security;
                var securityQs = [];
                for (var i=0;i<userSecurity.length;i++) {
                    securityQs.push(userSecurity[i].securityQ);
                }
                res.json({result: securityQs});
            }
            
        });
    });
}

api.validateAs = (UserRepo, DB) => (req, res) => {
    const username = req.body.username;
    const reqA1 = req.body.securityA1;
    const reqA2 = req.body.securityA2;
    const reqA3 = req.body.securityA3;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                queriedUser = queriedUser[0];
                var userSalts = queriedUser.identifier;
                var userSecurity = queriedUser.security;
                
                const hashedA1 = CryptoJS.HmacSHA256(reqA1,userSalts.saltA1).toString();
                const hashedA2 = CryptoJS.HmacSHA256(reqA2,userSalts.saltA2).toString();
                const hashedA3 = CryptoJS.HmacSHA256(reqA3,userSalts.saltA3).toString();

                const queriedA1 = userSecurity[0].securityA;
                const queriedA2 = userSecurity[1].securityA;
                const queriedA3 = userSecurity[2].securityA;

                if (hashedA1 === queriedA1 && hashedA2 === queriedA2 && hashedA3 === queriedA3) {
                    res.json({success: true});
                } else {
                    res.json({error: 'Wrong answers.'})
                }
            }
        });
    });
}

api.resetCreds = (UserRepo, DB) => (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                // reset creds
                queriedUser = queriedUser[0];
                var userSalts = queriedUser.identifier;
                // TODO change password salt too
                const passHashed = CryptoJS.HmacSHA256(password,salt.salt).toString();
            }
        });
    });
}


module.exports = api;