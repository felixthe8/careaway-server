const config = require('@accountConfig');
const models = require('@accountModels');

module.exports = (app) => {
  const api = app.account_management.app.api.sso;
  // POST /SSO/registration
  // This saves the SSO user credential within the CareAway system
  // Takes in User,Security,Salt model to create a user object
  app.route(config.routes.ssoRegistration).post(api.ssoRegistration(models.User, models.Salt, models.UserRepo, models.DB));

  // POST /SSO/login
  // Attempts to log user in with sent credentials from the database
  app.route(config.routes.ssoLogin).post(api.ssoLogin(models.UserRepo, models.DB));
    
  // PUT /SSO/ResetPassword
  // updates the user password within our system from the received information from sso
  app.route(config.routes.ssoResetPassword).put(api.ssoResetPassword(models.UserRepo, models.DB));
}