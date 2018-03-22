const config = require('@accountConfig');
const models = require('@accountModels');

module.exports = (app) => {
  const api = app.account_management.app.api.registration;
  const passport = app.passport;
  // POST /account/api/registration/patient
  // register new patient
  app.route(config.routes.registerPatient).post(api.register(passport));

  // POST /account/api/registration/medical-professional
  // register new med pro
  app.route(config.routes.registerMedpro).post(api.register(passport));

  app.route(config.routes.ssoRegisterPatient).post(api.ssoRegisterPatient(models.User,models.Security, models.Salt, models.Patient, models.UserRepo, models.DB));

  app.route(config.routes.ssoRegisterMed).post(api.ssoRegisterMed(models.User, models.Security, models.Salt,models.MedicalProfessional, models.UserRepo, models.DB));

}