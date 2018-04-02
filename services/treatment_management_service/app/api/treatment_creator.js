var moment = require('moment');

const api = {};

api.create = () => (req, res) => {
  console.log('Create treatment');
}

// Returns the MP code of the medical professional
// Function takes in a meter as a parameter
api.createTreatmentMeter = (TreatmentRepo,DB) => (req,res) => {
  var meter = {
      label: req.body.label,
      question: req.body.question,
      scale: req.body.scale,
      due_date: req.body.due_date,
      patient_input: null,
      created_at: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      updated_at: null
  }

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.CreateTreatment(req.body.user, meter);
    res.json({ success: true });
  })

}

// Returns the MP code of the medical professional
// Function takes in a meter as a parameter
api.createTreatmentChecklist = (TreatmentRepo,DB) => (req,res) => {
  var checklist = {
      label: req.body.label,
      list: req.body.list,
      due_date: req.body.due_date,
      created_at: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      updated_at: null
  }

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.CreateTreatment(req.body.user, checklist);
    res.json({ success: true });
  })

}

api.deleteTreatment = (TreatmentRepo,DB) => (req,res) => {

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.DeleteTreatment(req.body.user, req.body.treatment);
    res.json({ success: true });
  })

}

api.getTreatment = (TreatmentRepo,DB) => (req,res) => {

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.GetPatientTreatment(req.query.username).then(result => {
      res.json(result);
    });
  })
}

api.getDiagnosisList = (TreatmentRepo, DB) => (req,res) => {
  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.getDiagnosisList().then(function(value) {
      // Response will be an array inside an object
      res.send(value);
    });
  })
}

api.saveDiagnosis = (UserRepo, DB) => (req,res) => {
  DB.then(database => {
    // Extract the patient username and diagnosis
    const patientUsername = req.body.username;
    const patientDiagnosis = req.body.updatedDiagnosis;
    var userRepo = new UserRepo(database);
    // Update the patient diagnosis
     userRepo.EditPatientDiagnosis(patientUsername, patientDiagnosis)
     res.json({success: true});
  })
}
module.exports = api;
