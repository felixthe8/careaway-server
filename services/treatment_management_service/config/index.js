module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/treatment_plan/api/create',
    update: '/treatment_plan/api/edit',
    getPatientUserNames:'/treatment_plan/api/getPatientUserNames',
    getDiagnoses: '/treatment_plan/api/getDiagnoses',
    createTreatmentMeter: '/treatment_plan/api/createTreatmentMeter',
    createTreatmentChecklist: '/treatment_plan/api/createTreatmentChecklist',
    deleteTreatment: '/treatment_plan/api/deleteTreatement',
    getTreatment: '/treatment_plan/api/getTreatment',
    getSingleDiagnosis: '/treatment_plan/api/getSingleDiagnosis',
    getTreatmentMeter: '/treatment_plan/api/getTreatmentMeter',
    getSingleTreatmentmeter: '/treatment_plan/api/getSingleTreatmentmeter',
    getTreatmentChecklist: '/treatment_plan/api/getTreatmentChecklist',
    getSingleTreatmentchecklist: '/treatment_plan/api/getSingleTreatmentchecklist',
    treatmentBreach: 'http://localhost:4400/breach', // Why is this the full url?
    queryWidgets: '/treatment_plan/api/widgets',
    patientUpdate: '/treatment_plan/api/patient_edit',
    getDiagnosisList: '/treatment_plan/api/getDiagnosislist'
  },
  server: {
    port: 4400,
    host: 'localhost',
    url: 'http://localhost:4400'
  }
}


// PUT patientUpdate - update widget
// GET queryWidgets - get all widgets for patient