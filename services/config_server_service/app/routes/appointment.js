const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');
const csrf = require('@configServerAPI/csrfMiddleware');
module.exports = (app) => {
    
  app.use(csrf.CsrfValidation);
  app.route('/createAppointment').post(proxy(config.url.appointment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createAppt;
    }
  }));
  
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
