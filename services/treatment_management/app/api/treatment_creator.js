const api = {};
api.create = () => (req, res) => {
  console.log('Create treatment');
}

api.returnCode = (UserRepo,DB) => (req,res) => {
  const username = req.query.username;
  console.log(username);
  DB.then(database => {
    var userRepo = new UserRepo(database);

    userRepo.FindUser(username)
    .then(function(value){
      // var querieduser = value.User;
      // res.send({medicalcode: value.User[0].accountType.medicalcode});
      res.json({medicalcode: value.User[0].accountType.medicalcode});
    })
  })
}

api.getPatients = (UserRepo, DB) => (req,res) => {
  const mpCode = req.query.medicalcode;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value){ 
      // 'value' holds all the data about the patient
      // patientContainer will be used as the object to hold
      // information in patient[]
       var patientContainer = {}, patients = [];

       // loop through response value, and extract account information
       for(var i = 0; i < value.patients.length; i++) {
        patients.push(value.patients[i].accountType);
       }
       // store array of patient data inside patientContainer object
       patientContainer = {patients};
       
        // console.log(patientContainer);
      
      res.json(patientContainer);
    });
  });
}
module.exports = api;