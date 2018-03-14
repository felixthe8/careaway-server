module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/appointment/api/create',
    modify: '/appointment/api/edit',
    get: '/appointment/api/get',
    updateStatus: '/appointment/api/updateStatus'
    breach: '/breach',
  },
  server: {
    port: 4200
  }
}