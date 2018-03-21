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
  // Medical professional code
  const mpCode = req.query.medicalcode;
  // Date range that will be used to retrieve information
  const min = req.query.startDate;
  const max = req.query.finalDate;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value) { 
      // Create an array to store all the treatment objects for each patient the medical professional has
      var patientData = [];
      for (var singlePatient of value.patients) {
        for(var treatment of singlePatient.accountType.treatment) {
          patientData.push(treatment)
        }
      }
      // Filter treatment data to provide only meter widget data within the last full week
      patientData = patientData.filter ( treatment => treatment.label === "meter" && (treatment.due_date >=min && treatment.due_date <=max))
      res.json(patientData);
    })
  })
}

api.getTreatmentchecklist = (UserRepo,DB) => (req,res) => {
  // Medical professional code
  const mpCode = req.query.medicalcode;
  // Date range that will be used to retrieve information
  const min = req.query.startDate;
  const max = req.query.finalDate;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value) { 
      // Create an array to store all the treatment objects for each patient the medical professional has
      var patientData = [];
      for (var singlePatient of value.patients) {
        for(var treatment of singlePatient.accountType.treatment) {
          patientData.push(treatment)
        }
      }
      // Filter treatment data to provide only meter widget data within the last full week
      patientData = patientData.filter ( treatment => treatment.label === "checklist" && (treatment.due_date >=min && treatment.due_date <=max))
      res.json(patientData);
    })
  })
}

  module.exports = api;
