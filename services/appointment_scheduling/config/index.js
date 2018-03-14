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
    delete: '/appointment/api/delete',
    breach: '/breach',
  },
  server: {
    port: 4200
  }
}