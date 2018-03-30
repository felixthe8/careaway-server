
const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');


module.exports = (app) => {
  app.route('/createTreatment').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createTreatment;
    }
  }));

  app.route('/deleteTreatment').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.deleteTreatment;
    }
  }));
  
  app.route('/getTreatment').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getTreatment}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/createTreatmentMeter').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createTreatmentMeter;
    }
  }));
  
  app.route('/createTreatmentChecklist').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createTreatmentChecklist;
    }
  }));

  app.route('/getDiagnoses').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getDiagnoses}${req._parsedOriginalUrl.search}`; 
    }
  }));
  
  app.route('/getSingleDiagnosis').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getSingleDiagnosis}?username=${req.query.username}&medicalcode=${req.query.medicalcode}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`; 
    }
  }));
  
  app.route('/getTreatmentMeter').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getTreatmentMeter}${req._parsedOriginalUrl.search}`; 
    }
  }));
  
  app.route('/getPatientTreatment').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.queryWidgets}${req._parsedOriginalUrl.search}`;
    }
  }));
  
  app.route('/updatePatientTreatment').put(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.patientUpdate;
    }
  }));
  
  app.route('/getDiagnosisList').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getDiagnosisList}`; 
    }
  }));

  app.route('/getSingleTreatmentmeter').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getSingleTreatmentmeter}?username=${req.query.username}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`; 
    }
  }));
  // Why is this here??? Same as get-patients route in account?
  app.route('/getPatientUserNames').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getPatientUserNames}?medicalcode=${req.query.medicalcode}`; 
    }
  }));
  
  app.route('/getTreatmentChecklist').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getTreatmentChecklist}${req._parsedOriginalUrl.search}`; 
    }
  }));
  
  app.route('/getSingleTreatmentchecklist').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getSingleTreatmentchecklist}?username=${req.query.username}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`; 
    }
  }));
}