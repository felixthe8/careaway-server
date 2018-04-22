const proxy = require('express-http-proxy');
const config = require('@configServer/app/setup/config.js');
const csrf = require('@configServerAPI/csrfMiddleware');


module.exports = (app) => {

  app.use(csrf.CsrfValidation);

  /*
   * Treament Config Server Routing:
   * * all routing calls for config server
   */

  // Treatment CRUD Routes
  app.route('/createTreatment').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createTreatment;
    }
  }));

  app.route('/getTreatment').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getTreatment}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/updatePatientTreatment').put(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.patientUpdate;
    }
  }));

  app.route('/deleteTreatment').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.deleteTreatment;
    }
  }));

  // Treament Meter CRUD Routes
  app.route('/createTreatmentMeter').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createTreatmentMeter;
    }
  }));

  app.route('/getTreatmentMeter').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getTreatmentMeter}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/updateTreatmentMeter').put(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.updateTreatmentMeter;
    }
  }));

  app.route('/getPatientTreatment').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.queryWidgets}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/getSingleTreatmentmeter').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getSingleTreatmentmeter}?username=${req.query.username}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`;
    }
  }));

  // Treament Checklist CRUD Routes
  app.route('/createTreatmentChecklist').post(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.createTreatmentChecklist;
    }
  }));

  app.route('/getTreatmentChecklist').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getTreatmentChecklist}${req._parsedOriginalUrl.search}`;
    }
  }));

  app.route('/updateTreatmentChecklist').put(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.updateTreatmentChecklist;
    }
  }));

  app.route('/getSingleTreatmentchecklist').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getSingleTreatmentchecklist}?username=${req.query.username}&startDate=${req.query.startDate}&finalDate=${req.query.finalDate}`;
    }
  }));

  // Diagnosis Routes
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

  app.route('/getDiagnosisList').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getDiagnosisList}`;
    }
  }));

  app.route('/saveDiagnosis').put(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return config.routes.saveDiagnosis;
    }
  }));


  // Why is this here??? Same as get-patients route in account?
  app.route('/getPatientUserNames').get(proxy(config.url.treatment, {
    proxyReqPathResolver: function(req) {
      return `${config.routes.getPatientUserNames}?medicalcode=${req.query.medicalcode}`;
    }
  }));

}
