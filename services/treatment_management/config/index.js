module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/treatment_plan/api/create',
    update: 'treatment_plan/api/edit',
    patientUpdate: '/treatment_plan/api/patient_edit',
    queryWidgets: '/treatment_plan/api/widgets'
  },
  server: {
    port: 4400
  }
}


// PUT patientUpdate - update widget
// GET queryWidgets - get all widgets for patient