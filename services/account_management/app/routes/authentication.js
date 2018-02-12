const config = require('@accountConfig');
const models = require('@account/app/setup');
module.exports = (app) => {
    const api = app.account_management.app.api.authentication;

    app.route(config.routes.login).post(api.login(models.User, models.db));

    app.route('/').get((req, res) => {
        res.send('Test for account management.');
    });

}