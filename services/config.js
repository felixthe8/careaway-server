const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const config = {};

// Configurations for the config server.
config.server = {
  port : 8080,
}

// All routes the config server uses to route to the correct location..
config.routes = {
  login : `${accountConfig.routes.login}`,
  registerPatient : `${accountConfig.routes.registerPatient}`,
  registerMed: `${accountConfig.routes.registerMedpro}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQues : `${accountConfig.routes.securityQuestions}`,
  validateAnswers : `${accountConfig.routes.validateAnswers}`,
  resetCreds : `${accountConfig.routes.resetCreds}`,
  updateDiagnosis : `${accountConfig.routes.updateDiagnosis}`,
  breach : `${accountConfig.routes.breach}`,

  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,

  creatTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,

  getAppt : `${appointmentConfig.routes.get}`,
  createAppt : `${appointmentConfig.routes.create}`,
  updateAppt : `${appointmentConfig.routes.modify}`,
  deleteAppt : `${appointmentConfig.routes.delete}`,
  
  returnCode : `${treatmentConfig.routes.returnCode}`,
  getDiagnoses: `${treatmentConfig.routes.getDiagnoses}`,
  getSingleDiagnosis: `${treatmentConfig.routes.getSingleDiagnosis}`,
  getPatientUserNames: `${treatmentConfig.routes.getPatientUserNames}`,
  getTreatmentmeter: `${treatmentConfig.routes.getTreatmentmeter}`,
  getSingleTreatmentmeter: `${treatmentConfig.routes.getSingleTreatmentmeter}`,
  getTreatmentchecklist: `${treatmentConfig.routes.getTreatmentchecklist}`,
  getSingleTreatmentchecklist: `${treatmentConfig.routes.getSingleTreatmentchecklist}`,
};

// All urls the config server uses to route to the correct module.
config.url = {
  account : `localhost:${accountConfig.server.port}`,
  treatment : `localhost:${treatmentConfig.server.port}`,
  appointment : `localhost:${appointmentConfig.server.port}`
};

module.exports = config;