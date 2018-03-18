const config = require('@appointmentConfig');
const models = require('@appointmentModels');

module.exports = (app) => {
  const api = app.appointment_scheduling.app.api.appointments;

  // POST /appointment/api/create
  // Create an appointment.
  app.route(config.routes.create).post(api.create(models.Appointment, models.AppointmentRepo, models.DB));

  app.route(config.routes.modify).post(api.modify(models.Appointment, models.AppointmentRepo, models.DB));

  app.route(config.routes.get).get(api.get(models.AppointmentRepo,models.DB));

  app.route(config.routes.delete).post(api.delete(models.AppointmentRepo,models.DB));

  app.route('/').get((req,res) => {
    res.send('Test for appointment');
  });
}