const dbConnection = require('@dataAccess/db_connection');

// user repository
const UserRepo = require('@dataAccess/user_repository');


const model = {
  DB: new dbConnection().Connect(),
    UserRepo: UserRepo,
}
module.exports = model;