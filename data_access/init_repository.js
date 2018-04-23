const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
const db = require('./db_connection');

var database = new db();

function Initialization() {};

Initialization.prototype.init = function () {
  this.createConditionsCollection();
  this.createSystemAdmin();

}

// Create the conditions collection in the database and the corresponding document with the diagnoses
Initialization.prototype.createConditionsCollection = function() {
 database.Connect().then(function (value) {
  var conditions = require('./conditions/conditions');
  var diagnoses = conditions.list
  
  const collection = value.collection('Conditions');
  collection.count(function (err, count) {
    // Collection is empty so write the collection object to store the diagnoses
    if (count === 0) {
      collection.insertOne( {"Condition" : diagnoses})

    } else {
      // Otherwise, find the document and update it with the diagnoses
      collection.findOneAndUpdate(
        {'Condition' : {$exists:true}},
        {$set:{"Condition" : diagnoses }}
      )
    }  
  })

 })
}


Initialization.prototype.createSystemAdmin = function () {
  database.Connect().then(function (value) {
    const collection = value.collection('Users');
    // Create system admin user
    var adminUser = { "username": "TheChosenOne12", 
      "password": "d87b8f0767053c3e500827b9ce4d4078d5a1f33fbdbb75d25a7cb51e90ae7d59",
      "accountType": {"role": "system-admin"},
      "identifier": {"salt": "69fzcf39zwahjbap3a3f26sn6mxztewg"}
    }
    // Determine if a system admin user already exists
    collection.count({"accountType": {"role": "system-admin"}}, function(err, count) {
      // If the system admin does not already exist, insert into database
      if(count === 0) {
        collection.insertOne(adminUser);
      }
    })

  })
}

module.exports = Initialization

