const config = require('@mailConfig');
const models = require('@mailModel');
const api = require('@mailAPI/mail_service');

module.exports = (app) => {

  // Call create route in config server, and post with api
  app.route(config.routes.createMail).post(api.createMail(models.MailRepo, models.DB));
  app.route(config.routes.getMail).get(api.getMail(models.MailRepo, models.DB));
  app.route(config.routes.deleteMail).get(api.deleteMail(models.MailRepo, models.DB));

}
