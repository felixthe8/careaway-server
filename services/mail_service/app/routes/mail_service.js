const config = require('@mailConfig');
const models = require('@mailModel');
const api = require('@mailAPI/mail_service');

module.exports = (app) => {

  // Call create route in config server, and post with api
  // app.route(config.routes.createMail).post(api.createMail(models.mailRepo, models.DB));
  // app.route(config.routes.getMail).get(api.getMail(models.mailRepo, models.DB));
  // app.route(config.routes.deleteMail).get(api.deleteMail(models.mailRepo, models.DB));

  // test server
  app.route('/').get((req,res) => {
     res.send('Test for mail service');
  });
}
