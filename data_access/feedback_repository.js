const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectId;
const promise = require('promise');
/**
 * Constructor of the Feedback Repository
 * @param {*} dbConnection is the database connection string
 */
function FeedbackAccess(dbConnection)
{
  //fetches the database client connection
  this.db = dbConnection;
}
/**
 * This function inserts a new Feedback into the 
 * mongodb database with received information
 * 
 * @param {*} feedback object to be inserted
 */
FeedbackAccess.prototype.Create = function(feedback)
{ 
  return new Promise((fulfill, reject) => {
    const collection = this.db.collection('Feedbacks');
    collection.insertOne(feedback, function(err, result)
    {
      if(err === null){
        console.log('Inserted Feedback');
        fulfill(true);
      }
      else{
        console.log(err);
        fulfill(false);
      }
    });
  })
  
};
/**
 * @param {*} feedback object to be updated
 */
FeedbackAccess.prototype.EditFeedback = function(feedback){
  const collection = this.db.collection('Feedbacks');
  collection.updateOne(
    {'_id' : feedback._id },//looks for id in the database
    { $set: {'seen': feedback.seen }},//inserts new seen value
    function(err, result){
      console.log('Updated Feedback');
    }
  );
};
module.exports = FeedbackAccess;