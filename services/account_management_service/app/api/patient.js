const api = {};
//This updates the patient's diagnosis on the system
api.updateDiagnosis = (UserRepo, DB) => (req, res) => {
  // grab user and diagnosis from body
  const username = req.body.username;
  const diagnosis = req.body.diagnosis;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length === 0) {
        // user not found
        res.json({error: 'User does not exist.'});
      } else {
      // check if user is patient
      // only patients have a diagnosis field that can be updated
      queriedUser = queriedUser[0];
      var role = queriedUser.accountType.role;
      if (role === 'patient') {
        // update diagnosis
        userRepo.EditPatientDiagnosis(username, diagnosis);
        res.json({success: true});
      } else {
        res.json({error: 'User is not a patient.'});
      }
                
      }
    }); 
  });
}

// Gets a patient's transfer information.
api.getTransfer = (TransferRepo, DB) => (req, res) => {
  const patient = req.query.patient;
  DB.then(database => {
    TransferRepo.connect(database);
    TransferRepo.GetTransferPatient(patient).then(result => {
      if(result.exists) {
        console.log(result.transfer);
        res.json({success: true, transfer: result.transfer});
      } else {
        res.json({success: false, reason: "Error, couldn't get transfer information."});
      }
    });
  });
  
}
/**
 * Changes the patient's medical professional.
 * @param {*} UserRepo 
 * @param {*} DB 
 */
api.changeMedicalProfessional = (UserRepo, RequestRepo, DB) => (req, res) => {
  // Get the patient object.
  const patient = req.body.patient;
  // Get the new medical professional's code.
  const code = req.body.request.mp.code;
  const accept = req.body.status;
  if(accept) {
    // Update patient's object in db to this mp.
    // TODO: Finish this by updating patient object in db.
  } 
  // Delete request from db.
  RequestRepo.DeleteRequest(patient);
}

module.exports = api;