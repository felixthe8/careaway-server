require('module-alias/register');
const http = require('http');

// The individual service apps (modules).
const accountAPP = require('@accountAPP');
const appointmentAPP = require('@appointmentAPP');
const treatmentAPP = require('@treatmentAPP');

// Configuration files for each service.
const accountConfig = require('@accountConfig');
const appointmentConfig = require('@appointmentConfig');
const treatmentConfig = require('@treatmentConfig');

// Server ports for each service.
const accountPORT = accountConfig.server.port;
const appointmentPORT = appointmentConfig.server.port;
const treatmentPORT = treatmentConfig.server.port;

// Creating the servers for each service.
const accountServer = http.Server(accountAPP);
const appointmentServer = http.Server(appointmentAPP);
const treatmentServer = http.Server(treatmentAPP);

// Starting the account manager server 
accountServer.listen(accountPORT, () => {
  console.log(`Account manager API running on port ${accountPORT}.`);
});

// Starting the appointment manager server
appointmentServer.listen(appointmentPORT, () => {
  console.log(`Appointment manager API running on port ${appointmentPORT}.`);
});

// Starting the treatment manager server.
treatmentServer.listen(treatmentPORT, () => {
  console.log(`Treatment manager API running on port ${treatmentPORT}.`);
});

// Configuration server.
const configServer = require('@configServerAPP');
// Configuration for configuration server.
const config = require('@configServerConfig');

// Create the configuration server.
const server = http.Server(configServer);

// Start the proxy server.
server.listen(config.server.port, () => {
  console.log(`Config server running on port ${config.server.port}`);
});

// Do we still need this???
// Listens for a breach request to shut down all servers.
server.on('request', (req, res) => {
 
  
  
});