const MongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * The object that holds the function
 */
function Database(){}
/**
 * This function is used to connected to a local Mongo
 * Databaseit returns a fucntion in order to ensure the
 * connection to the database before proceeding to the next
 * operation
 */
Database.prototype.Connect = function()
{
  return new promise( function(fulfill,reject)
  {
  //conects to localhost
    MongoClient.connect('mongodb://localhost:27017', 
      function(err, client)
      {
        var db=client.db('CareAway');
        //return the error if some error happened
        if(err)
        { 
          reject(err);
        }
        //return the connection
        else{
          fulfill(db) 
        }
      }
    )
  });
}



module.exports = Database;