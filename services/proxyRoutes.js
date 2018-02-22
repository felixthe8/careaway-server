const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const routes = {
  login : `${accountConfig.routes.login}`,
  registerPatient : `${accountConfig.routes.registerPatient}`,
  registerMed: `${accountConfig.routes.registerMedpro}`,
  createAppt : `${appointmentConfig.routes.create}`,
  updateAppt : `${appointmentConfig.routes.update}`,
  creatTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,
  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQuestions : `${accountConfig.routes.securityQuestions}`,
  resetCred : `${accountConfig.routes.resetCreds}`
};

module.exports = routes;