var CryptoJS = require('crypto-js');

const api = {};

const USER_FOUND = 1;
const USER_NOT_FOUND = 0;

api.login = (Patient, MedicalProfessional, SystemAdmin, db) => (req, res) => {
    // grab username and password from body
    const username = req.body.username;
    const password = req.body.password;

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
                const userSalt = result[0].salt;
                const passHashed = CryptoJS.PBKDF2(password,userSalt, { keySize: 128/32, iterations: 1000 }).toString();
                if (passHashed === userPass) {
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
                    const userSalt = result[0].salt;
                    const passHashed = CryptoJS.PBKDF2(password,userSalt, { keySize: 128/32, iterations: 1000 }).toString();
                    if (passHashed === userPass) {
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
                    const userSalt = result[0].salt;
                    const passHashed = CryptoJS.PBKDF2(password,userSalt, { keySize: 128/32, iterations: 1000 }).toString();
                    if (passHashed === userPass) {
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

api.validateUsername = (Patient, MedicalProfessional, db) => (req, res) => {
    const username = req.body.username;

    db.then(database => {
        // query for patient with username
        new Patient.repo(database).GetOne(username).then(result => {
            if (result.length === 0) {
                // no patient with given username, so go to next query
                return USER_NOT_FOUND;
            } else {
                // patient was found
                res.json({success: true});
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
            if (result == USER_NOT_FOUND)
                res.json({error: 'User not found.'});
        });
    });
}

api.securityQs = (Patient, MedicalProfessional, db) => (req, res) => {
    const username = req.query.username;

    db.then(database => {
        // query for patient with username
        new Patient.repo(database).GetOne(username).then(result => {
            if (result.length === 0) {
                // no patient with given username, so go to next query
                return USER_NOT_FOUND;
            } else {
                // patient was found
                const user = result[0];
                const q1 = user.securityQ1;
                const q2 = user.securityQ2;
                const q3 = user.securityQ3;
                res.json({q1: q1, q2: q2, q3: q3});
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
                    const user = result[0];
                    const q1 = user.securityQ1;
                    const q2 = user.securityQ2;
                    const q3 = user.securityQ3;
                    res.json({q1: q1, q2: q2, q3: q3});
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

api.validateAs = (Patient, MedicalProfessional, db) => (req, res) => {
    const username = req.body.username;
    const reqA1 = req.body.securityA1;
    const reqA2 = req.body.securityA2;
    const reqA3 = req.body.securityA3;

    db.then(database => {
        // query for patient with username
        new Patient.repo(database).GetOne(username).then(result => {
            if (result.length === 0) {
                // no patient with given username, so go to next query
                return USER_NOT_FOUND;
            } else {
                // patient was found
                const user = result[0];
                const a1 = user.securityA1;
                const a2 = user.securityA2;
                const a3 = user.securityA3;
                const a1Sha = CryptoJS.SHA256(reqA1).toString(CryptoJS.enc.Hex);
                const a2Sha = CryptoJS.SHA256(reqA2).toString(CryptoJS.enc.Hex);
                const a3Sha = CryptoJS.SHA256(reqA3).toString(CryptoJS.enc.Hex);
                console.log(a1, a1Sha);
                if (a1 === a1Sha && a2 === a2Sha && a3 === a3Sha) {
                    res.json({success: true});
                } else {
                    res.json({error: 'Bad answers'});
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
                    const user = result[0];
                    const a1 = user.securityA1;
                    const a2 = user.securityA2;
                    const a3 = user.securityA3;
                    const a1Sha = CryptoJS.SHA256(reqA1).toString(CryptoJS.enc.Hex);
                    const a2Sha = CryptoJS.SHA256(reqA2).toString(CryptoJS.enc.Hex);
                    const a3Sha = CryptoJS.SHA256(reqA3).toString(CryptoJS.enc.Hex);
                    if (a1 === a1Sha && a2 === a2Sha && a3 === a3Sha) {
                        res.json({success: true});
                    } else {
                        res.json({error: 'Bad answers'});
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
    const username = req.body.username;
    const password = req.body.password;

    db.then(database => {
        var patientRepo = new Patient.repo(database);
        var medproRepo = new MedicalProfessional.repo(database);

        // query for patient with username
        patientRepo.GetOne(username).then(result => {
            if (result.length === 0) {
                // no patient with given username, so go to next query
                return USER_NOT_FOUND;
            } else {
                // patient was found
                var user = result[0];

                const salt = CryptoJS.lib.WordArray.random(128/8);
                const passHashed = CryptoJS.PBKDF2(password,salt, { keySize: 128/32, iterations: 1000 }).toString();

                console.log(user.password);
                console.log(passHashed);

                const updatedPatient = new Patient.create('aaaaaa', user.lastname, user.diagnosis, username, 
                    passHashed, salt, user.securityQ1, user.securityA1, 
                    user.securityQ2, user.securityA2, user.securityQ3, user.securityA3);

                patientRepo.Edit(username,updatedPatient);
                res.json({success: true});
                // return user found
                return USER_FOUND;
            }
        }).then(result => {
            // if user was already found, skip this promise
            if (result === USER_FOUND) return USER_FOUND;

            // query for med pro with username
            return medproRepo.GetOne(username).then(result => {
                if (result.length == 0) {
                    // no med pro with given username, so go to next query
                    return USER_NOT_FOUND;
                } else {
                    // med pro was found, check password
                    var user = result[0];

                    const salt = CryptoJS.lib.WordArray.random(128/8);
                    const passHashed = CryptoJS.PBKDF2(password,salt, { keySize: 128/32, iterations: 1000 }).toString();

                    const updatedMedpro = new MedicalProfessional.create(user.firstname, user.lastname, user.medicalcode, username, 
                        passHashed, salt, user.securityQ1, user.securityA1, 
                        user.securityQ2, user.securityA2, user.securityQ3, user.securityA3);

                    medproRepo.Edit(username,updatedMedpro);
                    res.json({success: true});
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


module.exports = api;