const api = {};

const returnUser = (userObject) => {
  const user = {
    username: userObject.username,
    firstName: userObject.accountType.firstName,
    lastName: userObject.accountType.lastName
  }
  return user;
}

const processPatientList = (patientList) => {
  let patients = [];
  for(let i in patientList) {
    patients.push(returnUser(patientList[i]));
  }
  return patients;
}

api.getUser = (UserRepo, DB) => (req, res) => {
  // Gets the data of one user.
  DB.then(database => {
    const userRepo = new UserRepo(database);
    userRepo.FindUser(req.query.username).then(result => {
      // Construct the user object being returned.
      const user = returnUser(result.User[0]);
      const returning = {success: true, user: user};
      res.json(returning);
    }).catch(error => {
      console.log("An error occurred getting the specified user.");
      res.json({success: false});
    });
  });
}

api.getAllPatients = (UserRepo, DB) => (req, res) => {
  // Gets all patients under the medical professional.
  DB.then(database => {
    const userRepo = new UserRepo(database);
    userRepo.FindPatient(req.query.code).then(result => {
      // Successfully queried a list of patients. Sends back to client.
      result.success = true;
      result.patients = processPatientList(result.patients);
      res.json(result);
    }).catch(error => {
      console.log("An error has occurred getting the medical professional's patients.");
      res.json({success: false});
    })
  });
}

api.getAppointmentPatientInfo = (UserRepo, DB) => (req, res) => {
  DB.then(database => {
    const userRepo = new UserRepo(database);
    
    userRepo.FindUser(req.query.username).then(result => {
      // Construct the user object being returned.
      const patient = returnUser(result.User[0]);
      userRepo.FindMP(result.User[0].accountType.medicalcode).then(result => {
        // Need to add this into the user repo
        const mp = [];
        mp.push(returnUser(result));
        
        const returning = {success: true, patient: patient, mp: mp};
        res.json(returning);
      });
    }).catch(error => {
      console.log("An error occurred getting the specified user.");
      res.json({success: false});
    });
  });
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

// This is only when the mp wants to create a new change mp request.
api.newMpRequest = (UserRepo, Request, RequestRepo, DB) => (req, res) => {
  // Check if the mp code is real.
  const code = req.body.request.mpCode;
  DB.then(database => {
    const userRepo = new UserRepo(database);
    userRepo.FindMP(code).then(foundMP => {
      if(foundMP) {
        // Found the medical professional.
        // TODO: log this object to see what it is, probably a user object.
        RequestRepo.connect(database);
        RequestRepo.GetRequestPatient(request.patient).then(result => {
          if(result.exists) {
            // Patient already has a change mp request. 
            // already exists but give them the option to modify

          } else {
            // Store as a request.
            const request = Request.requestFromObject(req.body.request);
            RequestRepo.StoreRequest(request);
            // End with response.
          }
        });
      } else {
        // MP code dne, send back error.
        res.json({success: false, message: "MP code does not exist."});
      }
    });
  });
  // Create a new request object.
  const request = Request.requestFromObject(req.body.request);
  // Add in check to see if the request already exists.

  // Store in the request repo.

}

api.modifyNewMpRequest = (Request, RequestRepo, DB) => (req, res) => {

}

module.exports = api;