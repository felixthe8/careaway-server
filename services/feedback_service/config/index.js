module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    feedback: '/feedback/api/feedback'
  },
  server: {
    port: 4600,
    host: 'localhost',
    url: 'http://localhost:4600'
  }
}