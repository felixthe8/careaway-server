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
    const searchDays = req.query.searchDays;
    console.log(searchDays);

    DB.then(database => {
      var userRepo = new UserRepo(database);
      userRepo.FindPatient(mpCode).then(function(value){ 
        // console.log(value.patients);

        /*
          double for - loop
          loop: day in searchDays
            loop: wellness for patients on that day

         output an array of the total wellness each day
         then we will average those values

        */
        res.json(value.patients)
      })
    })
  }
  module.exports = api;
