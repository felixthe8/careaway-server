const config = require('@accountConfig');
const models = require('@accountModels');
const api = require('@accountAPI/registration');

module.exports = (app) => {
  const passport = app.passport;
  // POST /account/api/registration
  // registers a new user
  app.route(config.routes.register).post(api.register(passport));

  app.route(config.routes.ssoRegisterPatient).post(api.ssoRegisterPatient(models.User,models.Security, models.Salt, models.Patient, models.UserRepo, models.DB));

  app.route(config.routes.ssoRegisterMed).post(api.ssoRegisterMed(models.User, models.Security, models.Salt,models.MedicalProfessional, models.UserRepo, models.DB));

}