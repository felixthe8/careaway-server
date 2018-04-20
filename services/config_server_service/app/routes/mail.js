const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');
const csrf = require('@configServerAPI/csrfMiddleware');


module.exports = (app) => {

  app.use(csrf.CsrfValidation);

  /*
   * Mail Config Server Routing:
   * * all routing calls for config server
   */

  // Mail CRUD Routes
  app.route('/createMail').post(proxy(config.url.mail, {
    proxyReqPathResolver: function(req) {
      return config.routes.createMail;
    }
  }));

  app.route('/getMail').get(proxy(config.url.mail, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getMail}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/deleteMail').post(proxy(config.url.mail, {
    proxyReqPathResolver: function(req) {
      return config.routes.deleteMail;
    }
  }));

}
