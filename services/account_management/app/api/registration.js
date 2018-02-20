var CryptoJS = require('crypto-js');

const api = {};

// TODO validation for unique username


function createGenericUser(User, Security, Salt, req) {
    const username = req.username;
    const password = req.password;
    const securityQ1 = req.securityQ1;
    const securityA1 = req.securityA1;
    const securityQ2 = req.securityQ2;
    const securityA2 = req.securityA2;
    const securityQ3 = req.securityQ3;
    const securityA3 = req.securityA3;

    const saltStrPass = CryptoJS.lib.WordArray.random(128/8).toString();
    const saltStrA1 = CryptoJS.lib.WordArray.random(128/8).toString();
    const saltStrA2 = CryptoJS.lib.WordArray.random(128/8).toString();
    const saltStrA3 = CryptoJS.lib.WordArray.random(128/8).toString();

    var salt = new Salt(saltStrPass, saltStrA1, saltStrA2, saltStrA3);

    const passHashed = CryptoJS.HmacSHA256(password,salt.salt).toString();
    const a1Hashed = CryptoJS.HmacSHA256(securityA1,salt.saltA1).toString();
    const a2Hashed = CryptoJS.HmacSHA256(securityA2,salt.saltA2).toString();
    const a3Hashed = CryptoJS.HmacSHA256(securityA3,salt.saltA3).toString();

    var sQ = [ 
        new Security(securityQ1,a1Hashed),
        new Security(securityQ2,a2Hashed),
        new Security(securityQ3,a3Hashed),
    ]

    return new User(username,passHashed,null,sQ,salt);
}


api.registerPatient = (User, Security, Salt, Patient, UserRepo, DB) => (req, res) => {
    const username = req.body.username;
    // check for unique user

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length > 0) {
                res.json({error: 'Username already exists.'})
            } else {
                // grab patient info from body
                const firstName = req.body.firstName;
                const lastName = req.body.lastName;
                const medicalCode = req.body.medicalCode;

                var newUser = createGenericUser(User, Security, Salt, req.body);
                var role = new Patient(firstName, lastName, medicalCode);
                newUser.accountType = role;
                
                userRepo.Create(newUser);
                res.json({success: true});
            }
        });
    });

    
}

api.registerMedpro = (User, Security, Salt, MedicalProfessional, UserRepo, DB) => (req, res) => {
    // grab med pro info from body
    const username = req.body.username;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length > 0) {
                res.json({error: 'Username already exists.'})
            } else {
                // grab patient info from body
                const firstName = req.body.firstName;
                const lastName = req.body.lastName;
                const medicalCode = req.body.medicalCode;

                var newUser = createGenericUser(User, Security, Salt, req.body);
                var role = new MedicalProfessional(firstName, lastName, medicalCode);
                newUser.accountType = role;

                userRepo.Create(newUser);
                res.json({success: true});
            }
        });
    });

    
}


module.exports = api;