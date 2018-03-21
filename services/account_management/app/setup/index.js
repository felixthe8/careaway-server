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
const Transformer = require('@root/services/transformer');

const models = {
	DB: new dbConnection().Connect(), // not model, but service/object
    UserRepo: UserRepo,
    User: User,
    Security: Security,
    Salt: Salt,
    Patient: Patient,
    MedicalProfessional: MedicalProfessional,
    SystemAdmin: SystemAdmin,
    Transformer: Transformer
}

module.exports = models;
