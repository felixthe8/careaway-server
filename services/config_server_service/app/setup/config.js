const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const config = {};

// All routes the config server uses to route to the correct location..
config.routes = {

  /*
   * Treament Config Server Route Creation:
   * * all routing creation for config server
   */

  // Account Module Routes
  login : `${accountConfig.routes.login}`,
  register : `${accountConfig.routes.register}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQues : `${accountConfig.routes.securityQuestions}`,
  validateAnswers : `${accountConfig.routes.validateAnswers}`,
  resetCreds : `${accountConfig.routes.resetCreds}`,
  updateDiagnosis : `${accountConfig.routes.updateDiagnosis}`,

  // SSO Module Routes
  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,
  ssoRegistration: `${accountConfig.routes.ssoRegistration}`,
  ssoLogin :  `${accountConfig.routes.ssoLogin}`,
  ssoResetPassword : `${accountConfig.routes.ssoResetPassword}`,

  // User Module Routes
  getUser : `${accountConfig.routes.getUser}`,
  getPatients : `${accountConfig.routes.getPatients}`,
  patientAppointmentInfo : `${accountConfig.routes.getAllInfoForPatientAppointment}`,
  getLoginInfo : `${accountConfig.routes.getLoginInfo}`,
  returnCode : `${accountConfig.routes.returnCode}`,
  patientUpdate: `${treatmentConfig.routes.patientUpdate}`,
  getPatientUserNames: `${treatmentConfig.routes.getPatientUserNames}`,

  // Appointment Module Routes
  getAppt : `${appointmentConfig.routes.get}`,
  createAppt : `${appointmentConfig.routes.create}`,
  updateAppt : `${appointmentConfig.routes.modify}`,
  updateApptStatus: `${appointmentConfig.routes.updateStatus}`,
  deleteAppt : `${appointmentConfig.routes.delete}`,

  // Breach Module Routes
  accountBreach : `${accountConfig.routes.accountBreach}`,
  appointmentBreach: `${appointmentConfig.routes.appointmentBreach}`,
  treatmentBreach: `${treatmentConfig.routes.treatmentBreach}`,

  // Treatment Module Routes
  createTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,
  deleteTreatment : `${treatmentConfig.routes.deleteTreatment}`,
  getTreatment : `${treatmentConfig.routes.getTreatment}`,
  queryWidgets: `${treatmentConfig.routes.queryWidgets}`,

  // Treatment Meter Module Routes
  createTreatmentMeter : `${treatmentConfig.routes.createTreatmentMeter}`,
  getTreatmentMeter: `${treatmentConfig.routes.getTreatmentMeter}`,
  getSingleTreatmentmeter: `${treatmentConfig.routes.getSingleTreatmentmeter}`,

  // Treatment Checklist Module Routes
  createTreatmentChecklist : `${treatmentConfig.routes.createTreatmentChecklist}`,
  getTreatmentChecklist: `${treatmentConfig.routes.getTreatmentChecklist}`,
  getSingleTreatmentchecklist: `${treatmentConfig.routes.getSingleTreatmentchecklist}`,

  // Diagnosis Module Routes
  getDiagnosisList: `${treatmentConfig.routes.getDiagnosisList}`,
  getDiagnoses: `${treatmentConfig.routes.getDiagnoses}`,
  getSingleDiagnosis: `${treatmentConfig.routes.getSingleDiagnosis}`,
  saveDiagnosis: `${treatmentConfig.routes.saveDiagnosis}`,

  // Mail Module Routes
  createMail: `${mailConfig.routes.createMail}`,
  getMail: `${mailConfig.routes.getMail}`,
  deleteMail: `${mailConfig.routes.deleteMail}`

};

// All urls the config server uses to route to the correct module.
config.url = {
  account : `${accountConfig.server.host}:${accountConfig.server.port}`,
  treatment : `${treatmentConfig.server.host}:${treatmentConfig.server.port}`,
  appointment : `${appointmentConfig.server.host}:${appointmentConfig.server.port}`,
  mail: `${mailConfig.server.host}:${mailConfig.server.port}`
};

module.exports = config;
