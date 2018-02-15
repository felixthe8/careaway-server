module.exports = {
    database: {
        host: 'mongodb',
        port: 27017,
        dbName: 'users'
    },
    routes: {
<<<<<<< HEAD
        login: '/account/api/authentication',
        register: '/account/api/registration'
=======
        registerPatient: '/account/api/registration/patient',
        login: '/account/api/authentication',
        resetCreds: '/account/api/reset-creds',
        updateDiagnosis: '/account/api/update-diagnosis'
>>>>>>> origin
    },
    server: {
        port: 4100
    }
}