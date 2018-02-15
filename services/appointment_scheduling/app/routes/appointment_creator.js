const config = require('@appointmentConfig');
module.exports = (app) => {
  const api = app.appointment_scheduling.app.api.appointment_creator;

  // Listens for a post request to create an appointment.
  app.route(config.routes.create).post(api.create());
}