const api = {};
api.create = () => (req, res) => {
  console.log('Create treatment');
}

// Returns the MP code of the medical professional
// Function takes in a username as a parameter
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
module.exports = api;