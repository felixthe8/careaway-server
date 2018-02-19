var CryptoJS = require('crypto-js');

const api = {};

// TODO validation for unique username

api.registerPatient = (User, Security, Salt, Patient, UserRepo, DB) => (req, res) => {
    // grab patient info from body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    //const diagnosis = req.body.diagnosis;
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

api.registerMedpro = (MedicalProfessional, db) => (req, res) => {
    // grab med pro info from body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const medicalCode = req.body.medicalCode;
    const username = req.body.username;
    const password = req.body.password;
    const securityQ1 = req.body.securityQ1;
    const securityA1 = req.body.securityA1;
    const securityQ2 = req.body.securityQ2;
    const securityA2 = req.body.securityA2;
    const securityQ3 = req.body.securityQ3;
    const securityA3 = req.body.securityA3;
    
    const salt = CryptoJS.lib.WordArray.random(128/8);

    const passHashed = CryptoJS.PBKDF2(password,salt, { keySize: 128/32, iterations: 1000 }).toString();
    const a1Sha = CryptoJS.SHA256(securityA1).toString(CryptoJS.enc.Hex);
    const a2Sha = CryptoJS.SHA256(securityA2).toString(CryptoJS.enc.Hex);
    const a3Sha = CryptoJS.SHA256(securityA3).toString(CryptoJS.enc.Hex);
    
    // create new med pro obj
    var newMedpro = new MedicalProfessional.create(firstName, lastName, medicalCode, username, passHashed,salt, securityQ1, a1Sha, securityQ2, a2Sha, securityQ3, a3Sha);

    db.then(database => {
        // insert med pro into db
        new MedicalProfessional.repo(database).Create(newMedpro);
        res.json({success: true});
    });
}


module.exports = api;