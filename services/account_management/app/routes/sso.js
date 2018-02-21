const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.account_management.app.api.sso;


    // POST /login
    // register user and determines account type from sso
    app.route(config.routes.ssoRegistration).post(api.ssoRegistration(models.User, models.Salt, models.UserRepo, models.DB));
    
    // POST /registration
    // authenticates user into the system from sso
    app.route(config.routes.ssoLogin).post(api.ssoLogin(models.UserRepo, models.DB));
    
    // GET /SendSSOInfo
    // reset credentials for user
    app.route(config.routes.ssoSendPassword).post(api.ssoSendPassword(models.UserRepo, models.DB));
    
    // GET /SendSSOInfo
    // reset credentials for user
    app.route(config.routes.ssoReceivePassword).post(api.ssoReceivePassword(models.UserRepo, models.DB));
    

    // GET /
    // test server
    app.route('/').get((req, res) => {
        res.send('Test for account management.');
    });
}