const api = {};

api.updateDiagnosis = (UserRepo, DB) => (req, res) => {
    const username = req.body.username;
    const diagnosis = req.body.diagnosis;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                queriedUser = queriedUser[0];
                var role = queriedUser.accountType.role;
                if (role === 'patient') {
                    // edit diagnosis
                    userRepo.EditPatientDiagnosis(username, diagnosis);
                    res.json({success: true});
                } else {
                    res.json({error: 'User is not a patient.'});
                }
                
            }
        });
    });
}


module.exports = api;