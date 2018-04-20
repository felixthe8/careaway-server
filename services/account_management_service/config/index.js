module.exports = {
  database: {
    host: 'mongodb',
    port: 27017,
    dbName: 'users'
  },
  routes: {
    // Registration
    register: '/account/api/registration',
    ssoRegisterPatient: '/account/api/ssoregistration/patient',
    ssoRegisterMed: '/account/api/ssoregistration/medical-professional',

    // Authentication
    login: '/account/api/authentication',
    validateUsername: '/account/api/validate-username',
    securityQuestions: '/account/api/security-questions',
    validateAnswers: '/account/api/validate-answers',
    resetCreds: '/account/api/reset-creds',

    // Patient
    updateDiagnosis: '/account/api/update-diagnosis',
    getTransferInformation: '/account/api/transfer-info',
    
    // sso
    ssoLogin: '/SSO/login',
    ssoRegistration: '/SSO/registration',
    ssoResetPassword:'/SSO/ResetPassword',

    // User management
    getLoginInfo:'/account/api/getLoginInfo',
    
    getUser: '/account/api/get-user',
    getPatients: '/account/api/get-all-patients',
    getAllInfoForPatientAppointment: '/account/api/get-patient-appointment-info',
    returnCode: '/account/api/returnCode',
    mpTransfer: '/account/api/newTransfer',
    removeTransfer: '/account/api/removeTransfer',
    acceptTransfer: '/account/api/acceptTransfer',
    
    accountBreach: 'http://localhost:4100/breach', // Why is this the full url???
  },
  server: {
    port: 4100,
    host: 'localhost',
    url: 'http://localhost:4100'
  }
}