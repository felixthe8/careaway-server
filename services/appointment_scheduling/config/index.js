module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/appointment/api/create',
    update: '/appointment/api/edit',
    breach: '/breach',
  },
  server: {
    port: 4200
  }
}