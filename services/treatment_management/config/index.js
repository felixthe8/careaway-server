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
    getPatientUserNames:'/treatment_plan/api/getPatientUserNames',
    getDiagnoses: '/treatment_plan/api/getDiagnoses',
    createTreatmentMeter: '/treatment_plan/api/createTreatmentMeter',
    createTreatmentChecklist: '/treatment_plan/api/createTreatmentChecklist',
    getSingleDiagnosis: '/treatment_plan/api/getSingleDiagnosis',
    getTreatmentmeter: '/treatment_plan/api/getTreatmentmeter',
    getSingleTreatmentmeter: '/treatment_plan/api/getSingleTreatmentmeter',
    getTreatmentchecklist: '/treatment_plan/api/getTreatmentchecklist',
    getSingleTreatmentchecklist: '/treatment_plan/api/getSingleTreatmentchecklist',
    treatmentBreach: 'http://localhost:4400/breach',
    queryWidgets: '/treatment_plan/api/widgets',
    patientUpdate: '/treatment_plan/api/patient_edit',
    getDiagnosisList: '/treatment_plan/api/getDiagnosisList'
  },
  server: {
    port: 4400
  }
}


// PUT patientUpdate - update widget
// GET queryWidgets - get all widgets for patient
