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
  const min = req.query.startDate;
  const max = req.query.finalDate;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value) { 
      // Create an array to store all the treatment objects for each patient the medical professional has
      var patientData = [];
      for (var singlePatient of value.patients) {
        // Add treatment objects of the patients to the array
        patientData.push(singlePatient.accountType.treatment);
      }
      // Response from data access layer is an array holding multiple arrays of treatment objects
     patientData = patientData.filter(function(treatment) {
       // Filter the data to extract only meter widget data and data that is within the time range
       return treatment.filter(widget => {
         if(!(widget.due_date >= min && widget.due_date <=max) || !(widget.label === "meter")){
          // Remove the widget if it is not necessary to return
          treatment.splice(treatment.indexOf(widget),1)
         } 
       })
     })
      res.json(patientData);
    })
  })
}

api.getTreatmentchecklist = (UserRepo,DB) => (req,res) => {
  const mpCode = req.query.medicalcode;
  DB.then(database => {
    var UserRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value) {
      // Create an array to store all the treatment objects for each patient the medical professional has
      var patientData = [];
      for(var singlePatient of value.patients) {
        // Add treatment objects of the patients to the array
        patientData.push(singlePatient.accountType.treatment);
      }
      // Extract out the checklist widget data from patient treatment []. Filters the return data between the specified dates
      patientData = patientData.filter(function(el) {
        return el.filter(widget => widget.label == 'checklist'); 
      });
      res.json(patientData);
    });
  });
}
  module.exports = api;
