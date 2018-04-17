const config = require('@appointmentConfig');
const models = require('@appointmentModels');
const api = require('@appointmentAPI/appointments');

module.exports = (app) => {
  // POST /appointment/api/create
  // Create an appointment.
  app.route(config.routes.create).post(api.create(models.Appointment, models.AppointmentRepo, models.DB));
  // POST /appointment/api/edit
  // EDIT an appointment.
  app.route(config.routes.modify).put(api.modify(models.Appointment, models.AppointmentRepo, models.DB));
  // GET /appointment/api/get
  // GET a list appointment.
  app.route(config.routes.get).get(api.get(models.AppointmentRepo,models.DB));
  // POST /appointment/api/delete
  // Delete an appointment.
  app.route(config.routes.delete).post(api.delete(models.Appointment,models.AppointmentRepo,models.DB));

}