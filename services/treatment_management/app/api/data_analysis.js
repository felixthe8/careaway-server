const api = {};
// Returns an array inside a JSON of all the patient diagnoses associated with a medical professional
api.getDiagnoses= (UserRepo, DB) => (req,res) => {
  const mpCode = req.query.medicalcode;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value){ 
       // Create an array to hold all patient diagnoses of the medical professional
      var patientDiagnoses = [];
        for (var p of value.patients) {
          patientDiagnoses.push(p.accountType.diagnosis);
        }
        res.json(patientDiagnoses);
    });
  });
}

  // Returns all meter widget data for all patients associated with a medical professional
api.getTreatmentmeter = (UserRepo,DB) => (req,res) => {
  const mpCode = req.query.medicalcode;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value){ 
      // Create an array to store all the treatment objects for each patient the medical professional has
      var patientData = [];
      for (var singlePatient of value.patients) {
        // Add treatment objects of the patients to the array
        patientData.push(singlePatient.accountType.treatment);
      }
      // Extract out meter widget data from patient treatment []
      patientData = patientData.filter(function(el) {
        return el.filter(widget => widget.label == 'meter')
      });
      res.json(patientData);
    })
  })
}
  module.exports = api;
