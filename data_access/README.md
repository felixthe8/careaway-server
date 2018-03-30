# Data Access Layer
The Data Access for the CareAway web application.

## Dependencies
Run MongoDb on a seperate terminal, redirect to your mongodb folder and run command 'mongod'
Add the following Collections to the Mongo Database

1. Users

## Module Description
#### Description
**`db_connection.js`** This is the static connection to the local database on your computer. Make sure to include it in the module for testing (but move it to proxy server in deployment). You will have to create the object and call the Connect method to create the db connection and make sure you save the connection to a variable

**`repository_test_module`** This is an example of how to use the db`_`connection and the patient`_`repository module. This is only a test file to check to test the functionality of each method in the patient`_`repository

**`user_repository.js`** This is the data access functionality for users within the careaway system. It contains the functionality to search for one user (used for registration to check if a user exist with in the system already), to search for all patients under one medical professional (to generate the list of patients the medical professional can choose), edit password (for the reset password functionality), and to save a user in the careaway system

**`treatment_plan_repository.js`** This is the data access functionality for treatment plans within the careaway system. It contains the functionality to get treatment plans fo a particular patient, gets Treatments plans of a particular diagnosis, edits an existing treatment plan, delete an existing treatment plan, or saves a treatment plan to the database
 
**`appointment_repository.js`** This is the data access functionality for appointments within the careaway system. It contains the functionality to get appointments for medical professionals and patients, save appointments into the database, edits any existing appointments, or delete appointments

**`token.js`** This is the data access functionality for Json Web Token within the careaway system. It contains the functionality to get Json Web Token, and save Json Web Token into the database









