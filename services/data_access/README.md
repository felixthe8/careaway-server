# Data Access Layer
The Data Access for the CareAway web application.

## Dependencies
Run MongoDb on a seperate terminal, redirect to your mongodb folder and run command 'mongod'
Add the following Collections to the Mongo Database

1. Patients
2. Medical Professionals
3. System Admin
4. Treatments
5. Appointments

## Module Description
#### Description
**`db_connection.js`** This is the static connection to the local database on your computer. Make sure to include it in the module for testing (but move it to proxy server in deployment). You will have to create the object and call the Connect method to create the db connection and make sure you save the connection to a variable

**`patient_repository.js`** This is the data access layer for patients that holds the Create , Read, Edit functionality. You need to create a new object and pass in the static db connection to use the functions 

**`PatientModel.js`** is just a temporary model used for testing the data access, delete after the actual models are created

**`repository_test_module`** This is an example of how to use the db`_`connection and the patient`_`repository module. This is only a test file to check to test the functionality of each method in the patient`_`repository















