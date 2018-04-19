module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    create: '/mail_service/api/create',
    get: '/mail_service/api/get',
    delete: '/mail_service/api/delete'
  },
  server: {
    port: 4500,
    host: 'localhost',
    url: 'http://localhost:4500'
  }
}
