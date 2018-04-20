const config = require('@treatmentConfig');
const models = require('@treatmentModels');
const api = require('@treatmentAPI/treatment_creator');
module.exports = (app) => {
  app.route(config.routes.create).post(api.create());
  app.route(config.routes.getDiagnosisList).get(api.getDiagnosisList(models.TreatmentRepo, models.DB));

  // Tretment Meter Routes
  app.route(config.routes.createTreatmentMeter).post(api.createTreatmentMeter(models.TreatmentRepo, models.DB));
  app.route(config.routes.updateTreatmentMeter).put(api.updateTreatmentMeter(models.TreatmentRepo, models.DB));

  // Treatment Checklist Routes
  app.route(config.routes.createTreatmentChecklist).post(api.createTreatmentChecklist(models.TreatmentRepo, models.DB));
  app.route(config.routes.updateTreatmentChecklist).put(api.updateTreatmentChecklist(models.TreatmentRepo, models.DB));


  // Treatment Routes
  app.route(config.routes.deleteTreatment).post(api.deleteTreatment(models.TreatmentRepo, models.DB));
  app.route(config.routes.getTreatment).get(api.getTreatment(models.TreatmentRepo, models.DB));

  // Diagnosis Routes
  app.route(config.routes.saveDiagnosis).put(api.saveDiagnosis(models.UserRepo, models.DB));
}
