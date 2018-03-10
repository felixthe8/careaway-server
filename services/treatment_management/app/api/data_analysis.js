const api = {};
api.getDiagnoses= (UserRepo, DB) => (req,res) => {
    const mpCode = req.query.medicalcode;
  
    DB.then(database => {
      var userRepo = new UserRepo(database);
      userRepo.FindPatient(mpCode).then(function(value){ 
        // The 'value' holds all the data about the patient
        // patientContainer will be used as the object to hold information about the patient in the response
         var patientContainer = {}, patientDiagnoses = [];
         for (var single of value.patients) {
            patientDiagnoses.push(single.accountType.diagnosis);
         }
         // Store array of patient diagnoses inside patientContainer object
         patientContainer = {patientDiagnoses};
        res.json(patientContainer);
      });
    });
  }

  api.getWellness = (UserRepo,DB) => (req,res) => {
    const mpCode = req.query.medicalCode;

    DB.then(database => {
      var userRepo = new UserRepo(database);
      userRepo.FindPatient(mpCode).then(function(value){ 
        // console.log(value.patients);
        var patientContainer = {}, patientData = [];
        for (var singlePatient of value.patients) {
          patientData.push(singlePatient.accountType.treatment);
        }
        console.log(patientData);

        res.json(patientData);
      })
    })
  }
  module.exports = api;
