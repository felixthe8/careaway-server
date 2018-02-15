const api = {};

api.login = (Patient, MedicalProfessional, SystemAdmin, db) => (req, res) => {
    // grab username and password from body
    const username = req.body.username;
    const password = req.body.password;

    db.then(database => {
        // query for patient with username
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


api.resetCreds = (Patient, MedicalProfessional, db) => (req, res) => {
    // TODO
    // yes
}


module.exports = api;