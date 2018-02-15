const dbConnection = require('@dataAccess/db_connection');

const patientRepo = require('@dataAccess/patient_repository');
const medproRepo = require('@dataAccess/medical_professional_repository');
const adminRepo = require('@dataAccess/system_admin_repository');

const Patient = require('@models/patient');
const MedicalProfessional = require('@models/medicalprofessional');
const SystemAdmin = require('@models/systemadmin');

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
