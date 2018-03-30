const config = require('@treatmentConfig');

const models = require('@treatmentModels');

module.exports = (app) => {
  const api = app.treatment_management.app.api.treatment_creator;
  app.route(config.routes.create).post(api.create());
  app.route(config.routes.returnCode).get(api.returnCode(models.UserRepo, models.DB));
  app.route(config.routes.getDiagnosisList).get(api.getDiagnosisList(models.TreatmentRepo, models.DB));

  app.route(config.routes.createTreatmentMeter).get(api.createTreatmentMeter(models.TreatmentRepo, models.DB));
  app.route(config.routes.createTreatmentChecklist).get(api.createTreatmentChecklist(models.TreatmentRepo, models.DB));
  app.route(config.routes.deleteTreatment).get(api.deleteTreatment(models.TreatmentRepo, models.DB));
  app.route(config.routes.getTreatment).get(api.getTreatment(models.TreatmentRepo, models.DB));
}
