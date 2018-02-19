var CryptoJS = require('crypto-js');

const api = {};

// TODO validation for unique username

api.registerPatient = (User, Security, Salt, Patient, UserRepo, DB) => (req, res) => {
    // grab patient info from body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
    const securityQ1 = req.body.securityQ1;
    const securityA1 = req.body.securityA1;
    const securityQ2 = req.body.securityQ2;
    const securityA2 = req.body.securityA2;
    const securityQ3 = req.body.securityQ3;
    const securityA3 = req.body.securityA3;
    const medicalCode = req.body.medicalCode;

    var salt = new Salt(CryptoJS.lib.WordArray.random(128/8).toString())
    var sQ = [ 
        new Security(securityQ1,securityA1),
        new Security(securityQ2,securityA2),
        new Security(securityQ3,securityA3),
    ]
    const passHashed = CryptoJS.HmacSHA256(password,salt.salt).toString();

    var role = new Patient(firstName, lastName, medicalCode)
    var newUser = new User(username,passHashed,role,sQ,salt);
    
    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.Create(newUser);
        res.json({success: true});
    })
}

api.registerMedpro = (User, Security, Salt, MedicalProfessional, UserRepo, DB) => (req, res) => {
    // grab med pro info from body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
    const securityQ1 = req.body.securityQ1;
    const securityA1 = req.body.securityA1;
    const securityQ2 = req.body.securityQ2;
    const securityA2 = req.body.securityA2;
    const securityQ3 = req.body.securityQ3;
    const securityA3 = req.body.securityA3;
    const medicalCode = req.body.medicalCode;
    
    var salt = new Salt(CryptoJS.lib.WordArray.random(128/8).toString())
    var sQ = [ 
        new Security(securityQ1,securityA1),
        new Security(securityQ2,securityA2),
        new Security(securityQ3,securityA3),
    ]
    const passHashed = CryptoJS.HmacSHA256(password,salt.salt).toString();

    var role = new MedicalProfessional(firstName, lastName, medicalCode)
    var newUser = new User(username,passHashed,role,sQ,salt);
    
    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.Create(newUser);
        res.json({success: true});
    })
}


module.exports = api;