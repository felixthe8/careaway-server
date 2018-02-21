const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.account_management.app.api.sso;


    app.route(config.routes.ssoRegistration).post(api.ssoRegistration(models.UserRepo, models.DB));


    app.route(config.routes.ssoLogin).post(api.ssoLogin(models.UserRepo, models.DB));
    

    app.route(config.routes.ssoResetPassword).put(api.ssoResetPassword(models.UserRepo, models.DB));

}