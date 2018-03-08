const config = require('@treatmentConfig');

const models = require('@account/app/setup');

module.exports = (app) => {
    const api = app.treatment_management.app.api.data_analysis;
    app.route(config.routes.getPatients).get(api.getPatients(models.UserRepo, models.DB));
}