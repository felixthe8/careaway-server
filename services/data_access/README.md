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

**`user_repository.js`** This is the data access functionality for users within the careaway system. It contains the functionality to search for one user (used for registration to check if a user exist with in the system already), to search for all patients under one medical professional (to generate the list of patients the medical professional can choose), edit password (for the reset password functionality), and to create a user in the careaway system














