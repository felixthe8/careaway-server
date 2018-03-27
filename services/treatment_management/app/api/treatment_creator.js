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
      // var querieduser = value.User;
      // res.send({medicalcode: value.User[0].accountType.medicalcode});
      res.json({medicalcode: value.User[0].accountType.medicalcode});
    })
  })
}

// Returns the MP code of the medical professional
// Function takes in a meter as a parameter
api.createTreatmentMeter = (UserRepo,DB) => (req,res) => {
    console.log(req);

  var meter = {
      label: req.query.label,
      question: req.query.question,
      scale: req.query.scale,
      due_date: req.query.due_date,
      patient_input: null,
      created_at: moment(new Date(Date.now()).format("YYYY-MM-DD")),
      updated_at: null
  }

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.CreateTreatment(meter);
    res.json({ success: true });
  })

}

// Returns the MP code of the medical professional
// Function takes in a meter as a parameter
api.createTreatmentChecklist = (UserRepo,DB) => (req,res) => {
  var checklist = {
      label: req.query.label,
      list: req.query.list,
      due_date: req.query.due_date,
      created_at: moment(new Date(Date.now()).format("YYYY-MM-DD")),
      updated_at: null
  }

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.CreateTreatment(checklist);
    res.json({ success: true });
  })

}

module.exports = api;
