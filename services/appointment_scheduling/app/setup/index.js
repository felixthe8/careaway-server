const dbConnection = require('@dataAccess/db_connection');

const AppointmentRepo = require('@dataAccess/appointment_repository');

const appointmentModel = require('@models/appointment');
const Patient = require('@models/patient')
const MedicalProfessional = require('@models/medicalprofessional');
const User = require('@models/users')


const model = {
  DB: new dbConnection().Connect(),
  AppointmentRepo: AppointmentRepo,
  Appointment: appointmentModel,
  Patient: Patient,
  MedicalProfessional: MedicalProfessional
}

module.exports = model;
