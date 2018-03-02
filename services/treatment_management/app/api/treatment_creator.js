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
      var querieduser = value.User;

      res.json({medicalcode: querieduser[0].accountType.medicalcode});
    })
  })
}

api.getPatients = (UserRepo, DB) => (req,res) => {
  const mpCode = req.query.medicalcode;

  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindPatient(mpCode).then(function(value){
      console.log(value);
      res.json(value);
    });
  });
}
module.exports = api;