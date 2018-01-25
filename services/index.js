require('module-alias/register');
const http = require('http');

// APIs
const accountAPI = require('@accountAPI');
const appointmentAPI = require('@appointmentAPI');
const treatmentAPI = require('@treatmentAPI');

// Configuration files
const accountConfig = require('@accountConfig');
const appointmentConfig = require('@appointmentConfig');
const treatmentConfig = require('@treatmentConfig');

// Server ports
const accountPORT = accountConfig.server.port;
const appointmentPORT = appointmentConfig.server.port;
const treatmentPORT = treatmentConfig.server.port;

// Creating the servers
const accountServer = http.Server(accountAPI);
const appointmentServer = http.Server(appointmentAPI);
const treatmentServer = http.Server(treatmentAPI);

// Starting the account manager server 
accountServer.listen(accountPORT, () => {
    console.log(`Account manager API running on port ${accountPORT}.`);
});

// Starting the appointment manager server
appointmentServer.listen(appointmentPORT, () => {
    console.log(`Appointment manager API running on port ${appointmentPORT}.`);
});

// Starting the treatment manager server
treatmentServer.listen(treatmentPORT, () => {
    console.log(`Treatment manager API running on port ${treatmentPORT}.`);
});