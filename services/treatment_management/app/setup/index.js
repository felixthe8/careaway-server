const treatmentModel = require('@treatmentModels/treatment_plan');

const dbConnection = require('@dataAccess/db_connection');

// user repository
const UserRepo = require('@dataAccess/user_repository');


const model = {
  DB: new dbConnection().Connect(),
    UserRepo: UserRepo,
   treatmentPlan : treatmentModel
}
module.exports = model;