const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const config = {};

config.routes = {
  login : `${accountConfig.routes.login}`,
  registerPatient : `${accountConfig.routes.registerPatient}`,
  registerMed : `${accountConfig.routes.registerMedpro}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQues : `${accountConfig.routes.securityQuestions}`,
  validAns : `${accountConfig.routes.validateAnswers}`,
  resetCreds : `${accountConfig.routes.resetCreds}`,
  updateDiagnosis : `${accountConfig.routes.updateDiagnosis}`,
  breach : `${accountConfig.routes.breach}`,
  createAppt : `${appointmentConfig.routes.create}`,
  updateAppt : `${appointmentConfig.routes.modify}`,
  getAppt : `${appointmentConfig.routes.get}`,
  creatTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,
  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQuestions : `${accountConfig.routes.securityQuestions}`,
  resetCred : `${accountConfig.routes.resetCreds}`
};

config.ports = {
  account : `${accountConfig.server.port}`,
  treatment : `${treatmentConfig.server.port}`,
  appointment : `${appointmentConfig.server.port}`
};

module.exports = config;