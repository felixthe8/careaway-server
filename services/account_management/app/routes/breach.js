const config = require('@accountConfig');
const models = require('@account/app/setup');

module.exports = (app) => {
  const api = app.account_management.app.api.breach;

  // POST /account/api/breach
  // shuts down server; there's been a breach!!!
  //app.route(config.routes.breach).post(api.shutdownDB(models.UserRepo, models.DB));

}