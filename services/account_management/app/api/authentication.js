const api = {};

const patientRepo = require('@dataAccess/patient_repository');

api.login = (User, db) => (req, res) => {
    
}

api.getPatients = (User, db) => (req, res) => {
    db.then(database => {
        new patientRepo(database).GetAll().then(result => {
            console.log(result);
            res.json({success: true, result: result});
        });
    });
}


module.exports = api;