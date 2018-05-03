var initialize = require('../data_access/init_repository');
var initializationObject = new initialize();
// Seed database with new documents for the conditions and system-admin
initializationObject.init()