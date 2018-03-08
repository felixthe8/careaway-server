const dbConnection = require('@dataAccess/db_connection');
const appointmentModel = require('@models/appointment');


const model = {
  Appointment: appointmentModel
}

module.exports = model;
