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
api.mpTransfer = (UserRepo, TransferRepo, DB) => (req, res) => {
  const transfer = req.body.transfer;
  // Check if the mp code is real.
  const code = transfer.mpCode;
  
  DB.then(database => {
    const userRepo = new UserRepo(database);
    // Test if the mpcode is real.
    userRepo.FindMP(code).then(foundMP => {
      
      if(foundMP) {
        // Assigns the mp's first and last name.
        transfer.newMp = `${foundMP.accountType.firstName} ${foundMP.accountType.lastName}`;
        // Request contains the patient's username and the transfer request.
        const request = {
          patient: req.body.patient,
          transfer: transfer // Contains new mp username and their mp code
        }
        //console.log(JSON.stringify(request));
        // Found the medical professional, store the request.
        // TODO: log this object to see what it is, probably a user object.
        TransferRepo.connect(database);
        TransferRepo.Update(request).then(result => {
          console.log("Handling transfer in user management " + JSON.stringify(result));
          if(result.success) {
            // Successfully stored the transfer
            res.json({success: result.success, transfer: result.transfer});
            console.log("Successfully inserted new transfer request");
          } 
        });
      } else {
        // MP code dne, send back error.
        res.json({success: false, message: "MP code does not exist."});
      }
    });
  });
}

// When a patient accepts a transfer request.
api.acceptTransfer = (UserRepo, DB) => (req, res, next) => {
  DB.then(database => {
    const userRepo = new UserRepo(database);
    const username = req.body.patient;
    const newMp = req.body.transfer.mpCode;
    // Changes their mp to the new one.
    userRepo.ChangeMP(username, newMp).then(result => {
      if(result.success) next();
      else res.end();
    });
  });
}

// Deletes the mp transfer request.
api.removeMpTransfer = (TransferRepo, DB) => (req, res) => {
  
  DB.then(database => {
    const transfer = {
      inProgress: false,
      newMp: '',
      mpcode: ''
    }
    
    const request = {
      patient: req.body.patient,
      transfer: transfer
    }
    TransferRepo.connect(database);
    TransferRepo.Update(request).then(result => {
      if(result.success) {
        res.json({success: result.success, transfer: result.transfer});
      } else {
        res.json({success: false, message: "Error removing request."});
      }
    });
  });
}

// Returns the MP username of the a patient's medical profesional
// Function takes in a patient's username as a parameter
api.getMedicalProfessional = (UserRepo, DB) => (req,res) => {
  const username = req.query.username;
  console.log("username:");
  console.log(username);
  DB.then(database => {
    var userRepo = new UserRepo(database);
    userRepo.FindUser(username).then(function(value) {
      let currentMP = value.User[0].accountType.medicalcode;
      userRepo.FindMP(currentMP).then(function(value) {
        res.json(value.username);
      })
    });
  });
}

module.exports = api;
