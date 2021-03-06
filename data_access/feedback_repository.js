const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectId;
const promise = require('promise');
/**
 * Constructor of the Feedback Repository
 * @param {*} dbConnection is the database connection string
 */
function FeedbackAccess(dbConnection)
{
  // Fetches the database client connection
  this.db = dbConnection;
}
/**
 * This function inserts a new Feedback into the 
 * mongodb database with received information
 * 
 * @param {*} feedback object to be inserted
 * @return {*} the promise that returns true if successfully inserted patient
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
    {'_id' : new objectID(feedback._id) }, // Looks for id in the database
    { $set: {'seen': feedback.seen }}, // Inserts new seen value
    function(err, result){
      console.log('Updated Feedback');
    }
  );
};
/** 
 * This function is used to gather a list of feedbacks
 * @returns {*} the promise to return the feedbacks
*/
FeedbackAccess.prototype.GetFeedbacks = function(){
  const collection = this.db.collection('Feedbacks');
  return new promise(function(fullfill,reject)
  {
    collection.find().sort({_id:-1}).toArray(function(err, res) 
    {
      if(err)
      {
        console.log('Failed to get query');
        reject(err);
      }
      else
      {
        fullfill({'result' : res});
      } 
    });
  });

};

module.exports = FeedbackAccess;