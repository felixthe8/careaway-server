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
        validateUsername: '/account/api/validate-username',
        securityQuestions: '/account/api/security-questions',
        validateAnswers: '/account/api/validate-answers',
        resetCreds: '/account/api/reset-creds',
        updateDiagnosis: '/account/api/update-diagnosis',
        breach: '/account/api/breach'
    },
    server: {
        port: 4100
    }
}