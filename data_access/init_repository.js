const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
const db = require('./db_connection');

var database = new db();

function Initialization() {};

Initialization.prototype.init = function () {
  this.createConditionsCollection();

}

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

module.exports = Initialization

