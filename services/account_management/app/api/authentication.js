const api = {};

api.login = (Patient, MedicalProfessional, SystemAdmin, db) => (req, res) => {
    // grab username and password from body
    const username = req.body.username;
    const password = req.body.password;

    const USER_FOUND = 1;
    const USER_NOT_FOUND = 0;

    // TODO not sure if this is the best way to chain promises
    // since i need to query from 3 different repos

    db.then(database => {
        // query for patient with username
        new Patient.repo(database).GetOne(username).then(result => {
            if (result.length === 0) {
                // no patient with given username, so go to next query
                return USER_NOT_FOUND;
            } else {
                // patient was found, check password
                const userPass = result[0].password;
                if (password === userPass) {
                    res.json({success: true, accountType: 'patient'});
                } else {
                    res.json({error: 'Wrong password.'})
                }
                // return user found
                return USER_FOUND;
            }
        }).then(result => {
            // if user was already found, skip this promise
            if (result === USER_FOUND) return USER_FOUND;

            // query for med pro with username
            return new MedicalProfessional.repo(database).GetOne(username).then(result => {
                if (result.length == 0) {
                    // no med pro with given username, so go to next query
                    return USER_NOT_FOUND;
                } else {
                    // med pro was found, check password
                    const userPass = result[0].password;
                    if (password === userPass) {
                        res.json({success: true, accountType: 'medical professional'});
                    } else {
                        res.json({error: 'Wrong password.'})
                    }
                    // return user found
                    return USER_FOUND;
                }
            })
        }).then(result => {
            // if user was already found, skip this promise
            if (result === USER_FOUND) return USER_FOUND;

            // query for admin with username
            return new SystemAdmin.repo(database).GetOne(username).then(result => {
                if (result.length == 0) {
                    // no admin with given username, so go to next query
                    return USER_NOT_FOUND;
                } else {
                    // admin was found, check password
                    const userPass = result[0].password;
                    if (password === userPass) {
                        res.json({success: true, accountType: 'system admin'});
                    } else {
                        res.json({error: 'Wrong password.'})
                    }
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


api.resetCreds = (Patient, MedicalProfessional, db) => (req, res) => {
    // TODO
    // yes
}


module.exports = api;