const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const routes = {
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
  updateAppt : `${appointmentConfig.routes.update}`,
  creatTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,
  returnCode : `${treatmentConfig.routes.returnCode}`,
  getDiagnoses: `${treatmentConfig.routes.getDiagnoses}`,
  getTreatmentmeter: `${treatmentConfig.routes.getTreatmentmeter}`,
  getTreatmentchecklist: `${treatmentConfig.routes.getTreatmentchecklist}`,
  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQuestions : `${accountConfig.routes.securityQuestions}`,
  resetCred : `${accountConfig.routes.resetCreds}`
};

module.exports = routes;