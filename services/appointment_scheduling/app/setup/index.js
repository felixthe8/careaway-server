const dbConnection = require('@dataAccess/db_connection');

const AppointmentRepo = require('@dataAccess/appointment_repository');

const Appointment = require('@models/appointment');

const models = {
  DB: new dbConnection().Connect(),
  AppointmentRepo: AppointmentRepo,
  Appointment: Appointment,
}

module.exports = models;
