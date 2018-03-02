const treatmentModel = require('@treatmentModels/treatment_plan');

const dbConnection = require('@dataAccess/db_connection');

// user repository
const UserRepo = require('@dataAccess/user_repository');

// all user models
const User = require('@models/users')
const Security = require('@models/security');
const Salt = require('@models/identifier');
const Patient = require('@models/patient')
const MedicalProfessional = require('@models/medicalprofessional');
const SystemAdmin = require('@models/systemadmin')

const model = {
  DB: new dbConnection().Connect(),
    UserRepo: UserRepo,
    User: User,
    Security: Security,
    Salt: Salt,
    Patient: Patient,
    MedicalProfessional: MedicalProfessional,
    SystemAdmin: SystemAdmin,
  treatmentPlan : treatmentModel
}
module.exports = model;