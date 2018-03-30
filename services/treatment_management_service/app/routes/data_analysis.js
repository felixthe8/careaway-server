const config = require('@treatmentConfig');
const models = require('@treatmentModels');
const api = require('@treatmentAPI/data_analysis');

module.exports = (app) => {
  app.route(config.routes.getDiagnoses).get(api.getDiagnoses(models.UserRepo, models.DB));
  app.route(config.routes.getSingleDiagnosis).get(api.getSingleDiagnosis(models.UserRepo, models.DB));
  app.route(config.routes.getPatientUserNames).get(api.getPatientUserNames(models.UserRepo, models.DB)); 
  app.route(config.routes.getSingleTreatmentmeter).get(api.getSingleTreatmentmeter(models.UserRepo, models.DB));   
  app.route(config.routes.getTreatmentMeter).get(api.getTreatmentMeter(models.UserRepo, models.DB));
  app.route(config.routes.getTreatmentChecklist).get(api.getTreatmentChecklist(models.UserRepo, models.DB));
  app.route(config.routes.getSingleTreatmentchecklist).get(api.getSingleTreatmentchecklist(models.UserRepo, models.DB));
}