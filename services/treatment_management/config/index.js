module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/treatment_plan/api/create',
    update: 'treatment_plan/api/edit',
    breach: '/breach',
  },
  server: {
    port: 4400
  }
}