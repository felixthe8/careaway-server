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
    const collection = this.db.collection('CSRFToken');
    collection.insertOne({"token":token}, function(err, result)
    {
        if(err){
            console.log(err); 
        } else{
            console.log('Inserted CSRF Token');
        }
    });
};
/**
 * This function finds an existing in the database,
 * and returns it as an object if found
 * @param {*} token the token the system is searching for
 * @returns {*} the array of Json Web Tokens
 */
TokenAccess.prototype.findExistingToken = function(token){
    const collection = this.db.collection('CSRFToken');
    return new promise(function(fullfill, reject){
        collection.findOne({'token.value' : token}, function(err, docs) 
        {
            if(err){
                console.log('Failed to get query');
                reject(err);
            } else {
                if(docs){
                    fullfill(docs);
                } else {
                    reject("Invalid Token");
                }
            }
        });
    });
};

module.exports = TokenAccess;