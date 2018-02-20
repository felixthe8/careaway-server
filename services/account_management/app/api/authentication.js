
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

    db.then(database => {
        var patientRepo = new Patient.repo(database);
        var medproRepo = new MedicalProfessional.repo(database);

        // query for patient with username
        patientRepo.GetOne(username).then(result => {
            if (result.length === 0) {
                // no patient with given username, so go to next query
                return USER_NOT_FOUND;
            } else {
                // patient was found
                var user = result[0];

                const salt = CryptoJS.lib.WordArray.random(128/8);
                const passHashed = CryptoJS.PBKDF2(password,salt, { keySize: 128/32, iterations: 1000 }).toString();

                console.log(user.password);
                console.log(passHashed);

                const updatedPatient = new Patient.create(user.firstname, user.lastname, user.diagnosis, username, 
                    passHashed, salt, user.securityQ1, user.securityA1, 
                    user.securityQ2, user.securityA2, user.securityQ3, user.securityA3);

                patientRepo.Edit(username,updatedPatient);
                res.json({success: true});
                // return user found
                return USER_FOUND;
            }
        }).then(result => {
            // if user was already found, skip this promise
            if (result === USER_FOUND) return USER_FOUND;

            // query for med pro with username
            return medproRepo.GetOne(username).then(result => {
                if (result.length == 0) {
                    // no med pro with given username, so go to next query
                    return USER_NOT_FOUND;
                } else {
                    // med pro was found, check password
                    var user = result[0];

                    const salt = CryptoJS.lib.WordArray.random(128/8);
                    const passHashed = CryptoJS.PBKDF2(password,salt, { keySize: 128/32, iterations: 1000 }).toString();

                    const updatedMedpro = new MedicalProfessional.create(user.firstname, user.lastname, user.medicalcode, username, 
                        passHashed, salt, user.securityQ1, user.securityA1, 
                        user.securityQ2, user.securityA2, user.securityQ3, user.securityA3);

                    medproRepo.Edit(username,updatedMedpro);
                    res.json({success: true});
                    // return user found
                    return USER_FOUND;
                }
            })
        }).then(result => {
            if (result == USER_NOT_FOUND)
                res.json({error: 'User not found.'});
        });
    });
}


module.exports = api;