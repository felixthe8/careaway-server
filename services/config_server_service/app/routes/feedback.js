const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');
const csrf = require('@configServerAPI/csrfMiddleware');


module.exports = (app) => {

  app.use(csrf.CsrfValidation);

  /*
   * Feedback Config Server Routing:
   * * all routing calls for config server
   */

  // Feedback CRUD Routes but without the D
  app.route('/feedback').get(proxy(config.url.feedback, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.feedback}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/feedback').post(proxy(config.url.feedback, {
    proxyReqPathResolver: function(req) {
      return config.routes.feedback;
    }
  }));

  app.route('/feedback').put(proxy(config.url.feedback, {
    proxyReqPathResolver: function(req) {
      return config.routes.feedback;
    }
  }));
}
