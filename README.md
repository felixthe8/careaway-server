# careaway-server
The server for the CareAway web application.

## Setup 
1. Clone the repository `git clone https://github.com/CrystalChun/careaway-server.git`
2. Create a data folder to house your mongo data
   * On terminal it's `mkdir data`
3. Start mongodb database `mongod --port 27017 --dbpath /path/to/data/folder/data`
4. Go into the project's folder `cd careaway-server` and run `node services` to start the server
## Dependencies
To install the dependencies available in package.json, run `npm install`. 

Currently in the package.json:
* express
* morgan
* body-parser
* module-alias
* helmet
* cors
* promise
* mongodb
* consign
* crypto-js
* csurf
* csrf
* moment
* passport
* passport-local

## Module Aliases
#### Description
The `module-alias` library allows the following aliases to be used throughout the files on the server. It encapsulates the routes to each of these locations within the server to make the importing files both cleaner and less error-prone.
`@root` .

#### Account API
| Alias           | Route                                                     | 
| :-------------: |-----------------------------------------------------------| 
| `@account`      | ./services/account_management_service                     | 
| `@accountModels`| ./services/account_management_service/app/setup           |
| `@accountConfig`| ./services/account_management_service/config/index.js     |
| `@accountAPI`   | ./services/account_management_service/app/api             |
| `@accountAPP`   | ./services/account_management_service/config/app.js       |


#### Appointment API
| Alias                | Route                                                     | 
| :-------------------:|-----------------------------------------------------------| 
| `@appointment`       | ./services/appointment_scheduling_service                 |
| `@appointmentModels` | ./services/appointment_scheduling_service/app/setup       |
| `@appointmentConfig` | ./services/appointment_scheduling_service/config/index.js |
| `@appointmentAPI`    | ./services/appointment_scheduling_service/app/api         |
| `@appointmentAPI`    | ./services/appointment_scheduling_service/config/app.js   |



#### Treatment Plan API
| Alias             | Route                                                    | 
| :---------------: |----------------------------------------------------------| 
| `@treatment`      | ./services/treatment_management_service                  |
| `@treatmentModels`| ./services/treatment_management_service/app/setup        |
| `@treatmentConfig`| ./services/treatment_management_service/config/index.js  |
| `@treatmentAPI`   | ./services/treatment_management_service/app/api          |
| `@treatmentAPP`   | ./services/treatment_management_service/config/app.js    |



#### Config Server API
| Alias                | Route                                                | 
| :------------------: |------------------------------------------------------| 
| `@configServer`      | ./services/config_server_service                     | 
| `@configServerConfig`| ./services/config_server_service/config/index.js     |
| `@configServerAPI`   | ./services/config_server_service/app/api             |
| `@configServerAPP`   | ./services/config_server_service/config/app.js       |


#### Miscellaneous Aliases
| Alias              | Route          | 
| :----------------: |----------------| 
| `@models`          | ./models       | 
| `@dataAccess`      | ./data_access  | 

## Mongo DB command to create Conditions array
* use CareAway
* db.createCollection(“Conditions”)
* db.Conditions.insert({Condition: ["Asthma","Generalized Anxiety Disorder", "Diabetes", "High Blood Pressure", "Panic Disorder", "Social Anxiety Disorder" ]})
