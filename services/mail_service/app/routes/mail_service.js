const config = require('@mailConfig');
const models = require('@mailRepo');
const api = require('@mail_service/mail_service');
module.exports = (app) => {
  app.route(config.routes.create).post(api.create());

  // Call create route in config server, and post with api
  app.route(config.routes.createMail).post(api.createMail(models.mailRepo, models.DB));
  app.route(config.routes.getMail).get(api.getMail(models.mailRepo, models.DB));
  app.route(config.routes.deleteMail).get(api.deleteMail(models.mailRepo, models.DB));

  // test server
  app.route('/').get((req,res), => {
     res.send('Test for mail service');
  });
}
