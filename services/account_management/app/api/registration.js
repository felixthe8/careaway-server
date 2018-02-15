var CryptoJS = require('crypto-js');

const api = {};

// TODO validation for unique username

api.registerPatient = (Patient, db) => (req, res) => {
    // grab patient info from body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const diagnosis = req.body.diagnosis;
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
    
    // create patient obj
    var newPatient = new Patient.create(firstName, lastName, diagnosis, username, passHashed, salt, securityQ1, a1Sha, securityQ2, a2Sha, securityQ3, a3Sha);
    
    db.then(database => {
        // insert patient into db
        new Patient.repo(database).Create(newPatient);
        res.json({success: true});
    });
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