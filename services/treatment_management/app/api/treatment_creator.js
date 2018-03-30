var moment = require('moment');

const api = {};

api.create = () => (req, res) => {
  console.log('Create treatment');
}

// Returns the MP code of the medical professional
// Function takes in a username as a parameter
api.returnCode = (UserRepo,DB) => (req,res) => {
  const username = req.query.username;
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(
      function(value){
      res.json({medicalcode: value.User[0].accountType.medicalcode});
    })
  })
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

api.getDiagnosisList = (TreatmentRepo,DB) => (req,res) => {

  DB.then(database => {
    var treatmentRepo = new TreatmentRepo(database);
    treatmentRepo.getDiagnosisList().then(function(value) {
        // Response will be an array inside an object
        res.send(value);
    });
    res.json({ success: true });
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
module.exports = api;
