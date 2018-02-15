const dbConnection = require('@dataAccess/db_connection');

// all repositories
const patientRepo = require('@dataAccess/patient_repository');
const medproRepo = require('@dataAccess/medical_professional_repository');
const adminRepo = require('@dataAccess/system_admin_repository');

// all models
const Patient = require('@models/patient');
const MedicalProfessional = require('@models/medicalprofessional');
const SystemAdmin = require('@models/systemadmin');

// each repo+model pair is bundled into one object for easy importing
const models = {
	db: new dbConnection().Connect(),
    Patient: {
    	repo: patientRepo,
    	create: Patient
    },
    MedicalProfessional: {
    	repo: medproRepo,
    	create: MedicalProfessional
    },
    SystemAdmin: {
    	repo: adminRepo,
    	create: SystemAdmin
    }
}

module.exports = models;
