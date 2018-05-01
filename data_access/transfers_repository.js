const transfers = {};

transfers.connect = (connection) => {
  transfers.db = connection;
}

// TODO: figure out how to make it into one thing
// 
transfers.GetTransferPatient = (username) => {
  const collection = transfers.db.collection('Users');
  return new Promise((fulfill, reject) => {
    collection.findOne({username : username}, (error, result) => {
      if(error) {
        console.log("Error, couldn't get query.");
        reject(error);
      } else {
        // Result is an object that has username, new MP: (code and name), status
        if(result) {
          fulfill({exists: true, transfer: result.accountType.transfer});
        }
        fulfill({exists: false});
      }
    })
  });
}

// request object contains 
transfers.Update = (request) => {
  const collection = transfers.db.collection('Users');
  
  return new Promise((fulfill, reject) => {
    console.log(JSON.stringify(request));
    // Update the patient who's being transfered. 
    collection.updateOne(
      {'username' : request.patient},
      {$set: {'accountType.transfer' : request.transfer}},
      (err, result) => {
        if(err) {
          console.log("Error adding patient transfer request.");
          fulfill({success: false, message: err});
        } else {
          console.log("Added patient transfer request.");
          fulfill({success: true, transfer: request.transfer});
        }
      }
    )
  });  
}



module.exports = transfers;
