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
api.getSingleDiagnosis= (UserRepo, DB) => (req,res) => {
  // Retrieve the Req attributes
  // Patient Username
  const username = req.query.username;
  // Medical code 
  const medicalcode = req.query.medicalcode;
  // Dates for Diagnosis
  const min = req.query.startDate;
  const max = req.query.finalDate;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value){ 
       // Find Singular Patient With Diagnosis
        const patient = value.User[0];
        const diagnosis = patient.accountType.diagnosis;
        userRepo.FindPatient(medicalcode).then(function(value) { 
          // Create an array to store all the treatment objects for each patient the medical professional has
          var patientData = [];
          for (var singlePatient of value.patients) {
            // Find all treatments and push it in data when the patient is the same diagnosis
            for(var treatment of singlePatient.accountType.treatment) {
              if(singlePatient.accountType.diagnosis === diagnosis){
                
                patientData.push(treatment)
              }
            
            }
          }
          // Meter and Checklist Widget
          const meterData = patientData.filter ( treatment => treatment.label === "meter" && (treatment.due_date >=min && treatment.due_date <=max));
          const checkData = patientData.filter ( treatment => treatment.label === "checklist" && (treatment.due_date >=min && treatment.due_date <=max));
          // Send meter data, checklist data, and diagnosis
          res.json({meter: meterData, checklist: checkData, diagnosis: diagnosis});
        });
    });
  });
}

api.getPatientUserNames= (UserRepo, DB) => (req,res) => {
  const mpCode = req.query.medicalcode;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value){ 
       // Create an array to hold all patients of the medical professional
      var patientUserName = [];
        for (var p of value.patients) {
          patientUserName.push({fullName: p.accountType.firstName + ' '+p.accountType.lastName, userName: p.username, diagnosis: p.accountType.diagnosis});
        }
        //send patient First Name and UserName
        res.json(patientUserName);
    });
  });
}
api.getSingleTreatmentmeter = (UserRepo,DB) => (req,res) => {
  // Retrieve Patient Username
  const username = req.query.username;
  // Date range that will be used to retrieve information
  const min = req.query.startDate;
  const max = req.query.finalDate;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value) { 
      // Create an array to store all the treatment objects for individual patient
      var patientData = [];
      const singlePatient = value.User[0];
        for(var treatment of singlePatient.accountType.treatment) {
          patientData.push(treatment);
        }
      // Filter treatment data to provide only meter widget data within the last full week
      patientData = patientData.filter ( treatment => treatment.label === "meter" && (treatment.due_date >=min && treatment.due_date <=max));
      // Send Individual Patient Data
      res.json(patientData);
    })
  })
}
// Returns all meter widget data for all patients associated with a medical professional
api.getTreatmentMeter = (UserRepo,DB) => (req,res) => {
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

api.getTreatmentChecklist = (UserRepo,DB) => (req,res) => {
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
api.getSingleTreatmentchecklist = (UserRepo,DB) => (req,res) => {
  // Retrieve patient Username
  const username = req.query.username;
  // Date range that will be used to retrieve information
  const min = req.query.startDate;
  const max = req.query.finalDate;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value) { 
      // Create an array to store all the treatment objects for individual Patient
      var patientData = [];
      const singlePatient = value.User[0];
        for(var treatment of singlePatient.accountType.treatment) {
          patientData.push(treatment);
        }
      // Filter treatment data to provide only meter widget data within the last full week
      patientData = patientData.filter ( treatment => treatment.label === "checklist" && (treatment.due_date >=min && treatment.due_date <=max));
      // Send Individual Patient Data
      res.json(patientData);
    })
  })
}
  module.exports = api;
