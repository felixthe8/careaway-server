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
        ssoLogin: '/SSO/login',
        ssoRegistration: '/SSO/registration',
        ssoResetPassword:'/SSO/ResetPassword',

    },
    server: {
        port: 4100
    }
}

// POST registerPatient (with username validation)
// POST registerMedpro (with username validation)
// POST authentication (patient and mp)
// POST validate username
// GET security questions for user
// POST validate answers
// PUT reset credentials
// PUT edit patient diagnosis data