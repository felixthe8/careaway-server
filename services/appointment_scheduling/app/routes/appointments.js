const config = require('@appointmentConfig');
module.exports = (app) => {
  const api = app.appointment_scheduling.app.api.appointments;

  // Listens for a post request to create an appointment.
  app.route(config.routes.create).post(api.create());

  app.route(config.routes.modify).post(api.modify());

  app.route(config.routes.get).get(api.get());
}