const accountConfig = require('@accountConfig');
const treatmentConfig = require('@treatmentConfig');
const appointmentConfig = require('@appointmentConfig');

const config = {};

config.routes = {
  login : `${accountConfig.routes.login}`,
  registerPatient : `${accountConfig.routes.registerPatient}`,
  registerMed: `${accountConfig.routes.registerMedpro}`,
  
  ssoRegisterPatient : `${accountConfig.routes.ssoRegisterPatient}`,
  ssoRegisterMed : `${accountConfig.routes.ssoRegisterMed}`,

  creatTreatment : `${treatmentConfig.routes.create}`,
  updateTreatment : `${treatmentConfig.routes.update}`,

  getAppt : `${appointmentConfig.routes.get}`,
  createAppt : `${appointmentConfig.routes.create}`,
  updateAppt : `${appointmentConfig.routes.modify}`,
  updateApptStatus: `${appointmentConfig.routes.updateStatus}`
};

config.ports = {
  account : `${accountConfig.server.port}`,
  treatment : `${treatmentConfig.server.port}`,
  appointment : `${appointmentConfig.server.port}`
};

module.exports = config;