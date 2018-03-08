const api = {};
api.getPatients = (UserRepo, DB) => (req,res) => {
    const mpCode = req.query.medicalcode;
  
    DB.then(database => {
      var userRepo = new UserRepo(database);
      userRepo.FindPatient(mpCode).then(function(value){ 
        // The 'value' holds all the data about the patient
        // patientContainer will be used as the object to hold information about the patient in the response
         var patientContainer = {}, patients = [];
  
         // Loop through response value, and extract account information
         for(var i = 0; i < value.patients.length; i++) {
          patients.push(value.patients[i].accountType);
         }
         // Store array of patient data inside patientContainer object
         patientContainer = {patients};
        res.json(patientContainer);
      });
    });
  }
  module.exports = api;
