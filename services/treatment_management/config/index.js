module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/treatment_plan/api/create',
    update: '/treatment_plan/api/edit',
    returnCode: '/treatment_plan/api/returnCode',
    getDiagnoses: '/treatment_plan/api/getDiagnoses',
    getTreatmentmeter: '/treatment_plan/api/getTreatmentmeter',
    getTreatmentchecklist: '/treatment_plan/api/getTreatmentchecklist',
    breach: '/breach',
    queryWidgets: '/treatment_plan/api/widgets',
    patientUpdate: '/treatment_plan/api/patient_edit',
  },
  server: {
    port: 4400
  }
}


// PUT patientUpdate - update widget
// GET queryWidgets - get all widgets for patient