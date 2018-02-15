const MongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * The object that holds the function
 */
function Database(){
  this.client;
}
/**
 * @TODO make the connection to the deployment 
 * database
 * 
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
        this.client = client;
        console.log("Connected to DB");
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

Database.prototype.Close = function()
{
  return new promise( function(fulfill,reject)
  {
    console.log('client');
    this.client.close();
    console.log('client');
    fulfull('blah');

  })

}

module.exports = Database;