const api = {};

api.patientUpdateMeter = (models) => (req, res) => {
  // grab widget object from body

  //var widget = 
  const username = req.body.widget.username;
  const created_at = req.body.widget.created_at;
  const answer = req.body.widget.answer;
  
  models.DB.then(database => {
    var treatmentRepo = new models.TreatmentRepo(database);

    // find user in db
    treatmentRepo.EditTreatment(username, ).then(function(value){
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
    });
  });
};

api.patientUpdateChecklist = (models) => (req, res) => {
    // get username, created_at, and question array from body
    // label is "checklist"
    //const username = req.body.username;
    //const password = req.body.password;
    
    models.DB.then(database => {
      var treatmentRepo = new models.TreatmentRepo(database);
      // find user in db
      treatmentRepo.FindUser(username).then(function(value){
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
      });
    });
  };

module.exports = api;