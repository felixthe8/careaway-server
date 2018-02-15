const api = {};

api.registerPatient = (Patient, db) => (req, res) => {
    // POST
    // registration
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
    
    var newPatient = new Patient.create(firstName, lastName, diagnosis, username, password, securityQ1, securityA1, securityQ2, securityA2, securityQ3, securityA3);
    db.then(database => {
        new Patient.repo(database).Create(newPatient);
        res.json({success: true});
    });
}

api.registerMedpro = (MedicalProfessional, db) => (req, res) => {
    // POST
    // registration
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
    
    var newMedpro = new MedicalProfessional.create(firstName, lastName, diagnosis, username, password, securityQ1, securityA1, securityQ2, securityA2, securityQ3, securityA3);
    db.then(database => {
        new MedicalProfessional.repo(database).Create(newMedpro);
        res.json({success: true});
    });
}


module.exports = api;