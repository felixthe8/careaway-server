module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    createMail: '/mail_service/api/createMail',
    getMail: '/mail_service/api/getMail',
    deleteMail: '/mail_service/api/deleteMail'
  },
  server: {
    port: 4500,
    host: 'localhost',
    url: 'http://localhost:4500'
  }
}
