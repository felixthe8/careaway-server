const api = {};

api.patientUpdate = (models) => (req, res) => {
  // grab widget object from body

  const username = req.body.username;
  // Var treatment should be the original object that was queried, but with updated data
  const treatment = req.body.treatment;
  
  models.DB.then(database => {
    var treatmentRepo = new models.TreatmentRepo(database);

    treatmentRepo.EditTreatment(username, treatment);
    res.json({success: true});
  });
};

api.queryWidgets = (models) => (req, res) => {
  // get username, created_at, and question array from body
  const username = req.query.username;
  //const password = req.body.password;
  
  models.DB.then(database => {
    var treatmentRepo = new models.TreatmentRepo(database);
    // find user in db
    treatmentRepo.GetPatientTreatment(username).then(function(value){
      if (!value) {
        // user was not found
        res.json({error: 'User does not exist.'});
      } else {
        // user was found
        var treatment = value.treatments;
        res.json({success: true, treatment: treatment});
      }
    });
  });
};

// TEMPORARY because there's no endpoint to create widget
api.createWidget = (models) => (req, res) => {
  // get username
  // get widget info

  // create
  const username = req.body.username;
  // Var treatment needs label, question, due_date
  const treatment = req.body.treatment;
  
  models.DB.then(database => {
    var treatmentRepo = new models.TreatmentRepo(database);

    if (treatment.label == 'meter') {
      const treatmentObj = new models.Meter(new models.Question(treatment.question), [1, 10], treatment.due_date);
    } else {
      var questionArray = [];
      for (var i=0;i<treatment.question.length;i++) {
        questionArray.push(new models.Question(treatment.question[i]));
      }
      const treatmentObj = new models.Checklist(questionArray, treatment.due_date);
    }
    
    // find user in db
    treatmentRepo.CreateTreatment(username, treatmentObj);
    res.json({success: true});
  });
}

module.exports = api;