const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');
const csrf = require('@configServerAPI/csrfMiddleware');

module.exports = (app) => {
    
  app.use(csrf.CsrfValidation);

  // Create appointment route - POST, proxies to the appointment creation url.
  app.route('/createAppointment').post(proxy(config.url.appointment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createAppt;
    }
  }));
  
  // Update appointment route - PUT, proxies to the appointment modification.
  app.route('/updateAppointment').put(proxy(config.url.appointment, {
    proxyReqPathResolver: function(req) {
      return config.routes.updateAppt;
    }
  }));
  
  app.route('/getAppt').get(proxy(config.url.appointment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getAppt}${req._parsedOriginalUrl.search}`;
    }
  }));
  
  app.route('/deleteAppt').post(proxy(config.url.appointment, {
    proxyReqPathResolver: function(req) {
      return config.routes.deleteAppt;
    }
  }));
}
