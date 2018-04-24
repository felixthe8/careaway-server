const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');

/**
 * Constructor of the User Repository
 * @param {*} dbConnection the database connection string
 */
function MailAccess(dbConnection) {
  //fetches the database client connection
  this.db = dbConnection;
}

/**
 * This appends a new message into the user
 * attribute of the appointee and initiator
 * mail list
 *
 * @param {*} initiator the initiator username
 * @param {*} appointee the appointee username
 * @param {*} message the message object that will be appended to the user
 */
MailAccess.prototype.CreateMail = function(initiator, appointee, message) {
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : initiator}, //looks for initiator in the database
    { $push: {'accountType.mail': message}}, //inserts new message on the array
    function(err, result) {
      console.log('Added message');
    }
  );
  collection.updateOne(
    {'username' : appointee}, //looks for appointee username in the database
    { $push: {'accountType.mail': message}}, //inserts new message on the array
    function(err, result) {
      console.log('Added message');
    }
  );
};

/**
 * This gets all mail of a particular user in the system
 * @param {*} username the user identifier
 * @returns {*} a promise that returns a list of messages on a user
 */
MailAccess.prototype.GetMail= function(username) {
  const collection = this.db.collection('Users');

  return new promise(function(fullfill,reject) {
    collection.findOne({'username' : username },function(err, result) {
      if(err) {
        console.log('Failed to get query');
        reject(err);
      }
      else {
        console.log('Successfully got query');
        if(result !== null) {
          var messages = result.accountType.mail;
          //return an object containing all the messages of the user
          var messageList = {'mail' : messages};
          fullfill(messageList);
        }
        else {
          fullfill(null);
        }
      }
    });
  });
};

/**
 * This deletes a appointment into the appointment
 * attribute of the appointee and initiator
 * appointment list
 *
 * @param {*} initiator the initiator username
 * @param {*} appointee the appointee username
 * @param {*} message the message object that will be deleted
 */
MailAccess.prototype.DeleteMail= function(initiator, appointee, message) {
  const collection = this.db.collection('Users');
  collection.updateOne({'username' : initiator }, //looks for username in the database
    { $pull: {'accountType.mail': message}}, //deletes the message
      function(err, result) {
        console.log('Remove message');
    });
  collection.updateOne({'username' : message}, //looks for username in the database
    { $pull: {'accountType.mail': message}}, //deletes the message
      function(err, result) {
      console.log('Remove message');
  });
};

module.exports = MailAccess;
