const config = require('@accountConfig');
const models = require('@accountModels');
const api = require('@accountAPI/sso');

module.exports = (app) => {
  // POST /SSO/registration
  // This saves the SSO user credential within the CareAway system
  // Takes in User,Security,Salt model to create a user object
  app.route(config.routes.ssoRegistration).post(api.ssoRegistration(models.User, models.Salt, models.UserRepo, models.DB,models.Transformer));

  // POST /SSO/login
  // Attempts to log user in with sent credentials from the database
  app.route(config.routes.ssoLogin).post(api.ssoLogin(models.UserRepo, models.DB, models.Transformer));
    
  // PUT /SSO/ResetPassword
  // updates the user password within our system from the received information from sso
  app.route(config.routes.ssoResetPassword).put(api.ssoResetPassword(models.UserRepo, models.DB,models.Transformer));

  app.route(config.routes.getLoginInfo).get(api.getLoginInfo(models.UserRepo, models.DB,models.Transformer));
}