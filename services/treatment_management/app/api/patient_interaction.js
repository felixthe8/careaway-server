const api = {};

api.patientUpdate = (models) => (req, res) => {
  // grab username and password from body
  //const username = req.body.username;
  //const password = req.body.password;
  
  DB.then(database => {
    /*var userRepo = new UserRepo(database);
    // find user in db
    userRepo.FindUser(username).then(function(value){
      var queriedUser = value.User;
      if (queriedUser.length === 0) {
        // user was not found
        res.json({error: 'User does not exist.'});
      } else {
        // user was found
        queriedUser = queriedUser[0];
        // hash password from request and compare with hashed password in db
        const passHashed = CryptoJS.HmacSHA256(password,queriedUser.identifier.salt).toString();
        if (passHashed === queriedUser.password) {
          if((Object.keys(queriedUser.accountType).length ===0)){
            //send a request telling client to register the user
            res.json({success: true, accountType: 'SSO'});
          } else{
            if (passHashed === queriedUser.password) {
              res.json({success: true, accountType: queriedUser.accountType.role});       
            } else {
               res.json({error: 'Wrong password.'})
            } 
          }
        } else {
          res.json({error: 'Wrong password.'})
          console.log("Wrong pass");

         }
       }
    });*/
  });
};

module.exports = api;