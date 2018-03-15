const mongoClient = require('mongodb').MongoClient;
const promise = require('promise');
/**
 * Constructor of the Token Repository
 * @param {*} dbConnection the database connection
 */
function TokenAccess(dbConnection)
{
    this.db = dbConnection;
}
/**
 * This saves the token that has been passed into the system
 * @param {*} token the token string that passed into the system
 */
TokenAccess.prototype.addToken = function(token){
    const collection = this.db.collection('JsonWebTokens');
    collection.insertOne({"token":token}, function(err, result)
    {
        if(err){
            console.log(err); 
        } else{
            console.log('Inserted Json Web Token');
        }
    });
};
/**
 * This function finds all existing JWT in the database,
 * and returns it as an object if found
 * @returns {*} the array of Json Web Tokens
 */
TokenAccess.prototype.getAllTokens = function(){
    const collection = this.db.collection('JsonWebTokens');
    return new promise(function(fullfill, reject){
        collection.find({}).toArray(function(err, docs)
        {
            if(err){
                console.log('Failed to get query');
                reject(err);
            } else {
                console.log('Successfully got query');
                var results = {'token' : docs};
                fullfill(results);
            }
        });
    });
};
/**
 * This function finds all existing JWT in the database,
 * and returns it as an object if found
 * @param {*} token the token the system is searching for
 * @returns {*} the array of Json Web Tokens
 */
TokenAccess.prototype.findExistingToken = function(token){
    const collection = this.db.collection('JsonWebTokens');
    return new promise(function(fullfill, reject){
        collection.find({'token' : token}).toArray(function(err, docs)
        {
            if(err){
                console.log('Failed to get query');
                reject(err);
            } else {
                console.log('Successfully got query');
                if(docs.length > 0){
                    fullfill(true);
                } else {
                    fullfill(false);
                }
            }
        });
    });
};

module.exports = TokenAccess;