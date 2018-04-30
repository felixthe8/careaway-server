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
 * @param {*} sender the initiator username
 * @param {*} receiver the appointee username
 * @param {*} message the message object that will be appended to the user
 */
MailAccess.prototype.CreateMail = function(sender, receiver, message) {
  const collection = this.db.collection('Users');
  collection.updateOne(
    {'username' : receiver}, //looks for recipient in the database
    { $push: {'accountType.mail': message }}, //inserts new message on the array
    function(err, result) {
      console.log('Added message');
    });
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
        reject(err);
      }
      else {
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
 * @param {*} sender the sender username
 * @param {*} receiver the receiver username
 * @param {*} message the message object that will be deleted
 */
MailAccess.prototype.DeleteMail= function(sender, reciever, message) {
  const collection = this.db.collection('Users');
  collection.updateOne({'username' : sender }, //looks for username in the database
    { $pull: {'accountType.mail': message}}, //deletes the message
      function(err, result) {
        console.log('Remove message');
    });
};

module.exports = MailAccess;
