var moment = require('moment');

const api = {};

api.create = () => (req, res) => {
  console.log('Create treatment');
}

/* Treatment API Calls */

api.getTreatment = (TreatmentRepo,DB) => (req,res) => {

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.GetPatientTreatment(req.query.username).then(result => {
      res.json(result);
    });
  })
}

api.deleteTreatment = (TreatmentRepo,DB) => (req,res) => {

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.DeleteTreatment(req.body.user, req.body.treatment);
    res.json({ success: true });
  })

}

/* Treatment Meter API Calls */

// Returns the MP code of the medical professional
// Function takes in a meter as a parameter
api.createTreatmentMeter = (TreatmentRepo,DB) => (req,res) => {
  var meter = {
    label: req.body.treatment.label,
    question: req.body.treatment.question,
    scale: req.body.treatment.scale,
    due_date: req.body.treatment.due_date,
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

api.updateTreatmentMeter = (TreatmentRepo,DB) => (req,res) => {
  var meter = {
    label: req.body.treatment.label,
    question: req.body.treatment.question,
    scale: req.body.treatment.scale,
    due_date: req.body.treatment.due_date,
    patient_input: null,
    created_at: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    updated_at: null
  }
  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.EditTreatment(req.body.user, meter);
    res.json({ success: true });
  })

}

/* Treatment Checklist API Calls */

// Returns the MP code of the medical professional
// Function takes in a meter as a parameter
api.createTreatmentChecklist = (TreatmentRepo,DB) => (req,res) => {
  var checklist = {
    label: req.body.treatment.label,
    list: req.body.treatment.list,
    due_date: req.body.treatment.due_date,
    created_at: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    updated_at: null
  }

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.CreateTreatment(req.body.user, checklist);
    res.json({ success: true });
  })

}

api.updateTreatmentChecklist = (TreatmentRepo,DB) => (req,res) => {
  var checklist = {
    label: req.body.treatment.label,
    list: req.body.treatment.list,
    due_date: req.body.treatment.due_date,
    created_at: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    updated_at: null
  }

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.EditTreatment(req.body.user, checklist);
    res.json({ success: true });
  })

}

/* Diagnosis API Calls */

api.getDiagnosisList = (TreatmentRepo, DB) => (req,res) => {
  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.getDiagnosisList().then(function(value) {
      // Response will be an array inside an object
      res.json(value);
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
