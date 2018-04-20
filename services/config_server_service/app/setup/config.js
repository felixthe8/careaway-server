const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const config = {};

// All routes the config server uses to route to the correct location..
config.routes = {
  // Account module routes.
  login : `${accountConfig.routes.login}`,
  register : `${accountConfig.routes.register}`,
  validateUsername : `${accountConfig.routes.validateUsername}`,
  securityQues : `${accountConfig.routes.securityQuestions}`,
  validateAnswers : `${accountConfig.routes.validateAnswers}`,
  resetCreds : `${accountConfig.routes.resetCreds}`,
  updateDiagnosis : `${accountConfig.routes.updateDiagnosis}`,

  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,
  ssoRegistration: `${accountConfig.routes.ssoRegistration}`,
  ssoLogin :  `${accountConfig.routes.ssoLogin}`,
  ssoResetPassword : `${accountConfig.routes.ssoResetPassword}`,

  getPatients : `${accountConfig.routes.getPatients}`,
  getUser : `${accountConfig.routes.getUser}`,
  patientAppointmentInfo : `${accountConfig.routes.getAllInfoForPatientAppointment}`,
  getLoginInfo : `${accountConfig.routes.getLoginInfo}`,
  returnCode : `${accountConfig.routes.returnCode}`,
  mpTransfer: `${accountConfig.routes.mpTransfer}`,
  removeTransfer: `${accountConfig.routes.removeTransfer}`,
  getTransferInformation: `${accountConfig.routes.getTransferInformation}`,
  
  // Appointment routes.
  getAppt : `${appointmentConfig.routes.get}`,
  createAppt : `${appointmentConfig.routes.create}`,
  updateAppt : `${appointmentConfig.routes.modify}`,
  updateApptStatus: `${appointmentConfig.routes.updateStatus}`,
  deleteAppt : `${appointmentConfig.routes.delete}`,

  // Breach
  accountBreach : `${accountConfig.routes.accountBreach}`,
  appointmentBreach: `${appointmentConfig.routes.appointmentBreach}`,
  treatmentBreach: `${treatmentConfig.routes.treatmentBreach}`,

  // Treatment routes.
  createTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,
  deleteTreatment : `${treatmentConfig.routes.deleteTreatment}`,
  getTreatment : `${treatmentConfig.routes.getTreatment}`,
  
  createTreatmentMeter : `${treatmentConfig.routes.createTreatmentMeter}`,
  createTreatmentChecklist : `${treatmentConfig.routes.createTreatmentChecklist}`,
  
  getDiagnosisList: `${treatmentConfig.routes.getDiagnosisList}`,
  patientUpdate: `${treatmentConfig.routes.patientUpdate}`,
  queryWidgets: `${treatmentConfig.routes.queryWidgets}`,
  
  getDiagnoses: `${treatmentConfig.routes.getDiagnoses}`,
  getSingleDiagnosis: `${treatmentConfig.routes.getSingleDiagnosis}`,
  getPatientUserNames: `${treatmentConfig.routes.getPatientUserNames}`,
  getTreatmentMeter: `${treatmentConfig.routes.getTreatmentMeter}`,
  getSingleTreatmentmeter: `${treatmentConfig.routes.getSingleTreatmentmeter}`,
  getTreatmentChecklist: `${treatmentConfig.routes.getTreatmentChecklist}`,
  getSingleTreatmentchecklist: `${treatmentConfig.routes.getSingleTreatmentchecklist}`,
  saveDiagnosis: `${treatmentConfig.routes.saveDiagnosis}`
};

// All urls the config server uses to route to the correct module.
config.url = {
  account : `${accountConfig.server.host}:${accountConfig.server.port}`,
  treatment : `${treatmentConfig.server.host}:${treatmentConfig.server.port}`,
  appointment : `${appointmentConfig.server.host}:${appointmentConfig.server.port}`
};

module.exports = config;