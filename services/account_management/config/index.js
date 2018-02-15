module.exports = {
    database: {
        host: 'mongodb',
        port: 27017,
        dbName: 'users'
    },
    routes: {
        registerPatient: '/account/api/registration/patient',
        registerMedpro: '/account/api/registration/medical-professional',
        login: '/account/api/authentication',
        resetCreds: '/account/api/reset-creds',
        updateDiagnosis: '/account/api/update-diagnosis',
        breach: '/account/api/breach'
    },
    server: {
        port: 4100
    }
}

// POST registerPatient (with username validation)
// POST registerMedpro (with username validation)
// POST authentication (patient and mp)
// PUT reset credentials
// PUT edit patient diagnosis data
// POST breach, close server server.close