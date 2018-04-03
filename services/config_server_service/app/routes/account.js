const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');
const csrf = require('@configServerAPI/csrfMiddleware');
const url = config.url.account;
/**
 * This router routes all requests to the account management module.
 * @param {*} app 
 */
module.exports = (app) => {
  app.route('/Sso/Registration').post(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.ssoRegistration;
    }
  }));

  app.route('/Sso/ResetPassword').put(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.ssoResetPassword;
    }
  }));

  app.route('/Sso/Login').post(csrf.createCSRFToken, proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.ssoLogin;
    }
  }));
    
  app.route('/getLoginInfo').get(csrf.createCSRFToken,proxy(url, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getLoginInfo}${req._parsedOriginalUrl.search}&csrfToken=${req.csrfToken}`; 
    }
  }));


  app.use(csrf.CsrfValidation);
  // TODO: refactor registration in passport
  // Proxies POST request to register a patient the account management module. 
  // localhost:4100/account/api/registration
  app.route('/register').post(proxy(url, {
    proxyReqPathResolver: function(req) {
      return config.routes.register;
    } 
  }));

  // Proxies login POST request.
  app.route('/login').post(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.login;
    }
  }));



  

  app.route('/validate-username').post(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.validateUsername;
    }
  }));
  
  app.route('/validate-answers').post(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.validateAnswers;
    }
  }));
  
  app.route('/security-questions').get(proxy(url, {
    proxyReqPathResolver: function() {
      return `${config.routes.securityQues}${req._parsedOriginalUrl.search}`; 
    }
  }));
  
  app.route('/reset-creds').put(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.resetCreds;
    }
  }));
  
  app.route('/ssoRegisterMed').post(proxy(url, {
    proxyReqPathResolver: function() {
      return config.routes.ssoRegisterMed;
    }
  }));
  
  // Past this point, the requester needs to be authenticated
  const passportConfig = require('../api/authenticator');
  app.use(passportConfig.isAuthenticated);
  app.use('/logout', passportConfig.logout);

  app.route('/get-user').get(proxy(url, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getUser}${req._parsedOriginalUrl.search}`;
    }
  }));
  
  app.route('/get-patients').get(proxy(url, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getPatients}${req._parsedOriginalUrl.search}`;
    }
  }));
  
  app.route('/patient-appointment-info').get(proxy(url, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.patientAppointmentInfo}${req._parsedOriginalUrl.search}`
    }
  }));


  // Shouldn't this be in user management????
  app.route('/returnCode').get(proxy(url, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.returnCode}${req._parsedOriginalUrl.search}`; 
    }
  }));
}