const api = {};

api.login = (Patient, MedicalProfessional, SystemAdmin, db) => (req, res) => {
    // POST
    // auth user credentials
    // for now it only works with patient
    // TODO also do medical professional
    const username = req.body.username;
    const password = req.body.password;

    db.then(database => {
        new Patient.repo(database).GetOne(req.body.username).then(result => {
            console.log(result);
            if (result.length == 0) {
                res.json({error: 'User not found.'});
            } else {
                const userPass = result[0].password;
                if (password === userPass) {
                    res.json({success: true, redirect: ''});
                } else {
                    res.json({error: 'Wrong password.'})
                }
            }
        });
    });
}

// might need validation for security questions

api.resetCreds = (Patient, MedicalProfessional, db) => (req, res) => {
    // PUT
    // update credentials   
}

api.getPatients = (Patient, db) => (req, res) => {
    db.then(database => {
        new Patient.repo(database).GetAll().then(result => {
            console.log(result);
            res.json({success: true, result: result});
        });
    });
}


module.exports = api;