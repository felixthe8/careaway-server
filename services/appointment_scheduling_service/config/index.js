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
    appointmentBreach: 'http://localhost:4200/breach', // WHY is this here????????
  },
  server: {
    port: 4200,
    host: 'localhost',
    url: 'http://localhost:4200'
  }
}