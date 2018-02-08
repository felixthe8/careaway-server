const MongoClient = require('mongodb').MongoClient;

function Database(){
    //This holds the mongo database connection
    var db;
}
/**
 * @TODO make this a static connection
 * Currently this fires off automatically due
 * to commonJS (exports and requires) we need to
 * make it one connection and reuse a static variable
 * @TODO make the connection to the deployment 
 * database
 * 
 * This function is used to connected to a local Mongo
 * Database
 * 
 */
Database.prototype.Connect = 
    MongoClient.connect('mongodb://localhost:27017', 
    function(err, client){
        console.log("Connected to DB");
        db=client.db('CareAway');
    });


module.exports = Database;