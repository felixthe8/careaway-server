# CareAway Treatment Planner Server Side
This is a repository for the 491A/491B project completed by Team Tangent (Jimmy Chao, Eugene Mesina, Tyler Dao, Crystal Chun, Taylor Tobin, and Felix Huang). The goal of this project was to develop an single-page application to allow medical professionals and their patients to interact with one another without both parties having to be in the same location at the same time. 

## Project Description
The CareAway Treatment Planner is a single-page application developed using a modified version of the MEAN stack - MongoDB, Express, Vue.js, and NodeJS. The motivation that CareAway Treatment Planner satisfies is the lack of communication between medical professionals and patients outside of the medical facility. The application allows medical professionals to create treatment plans with actionable tasks, set up appointments, and view trends in their patients' condition. In turn, patients are able to interact and provide feedback with their treatment plans as well as schedule appointments with their medical professionals. Furthermore, Troy Hunt's [haveibeenpwned](https://haveibeenpwned.com/Passwords) service to ensure that our users are registering with uncompromised credentials. 

## Getting Started
1. Clone the repository `git clone https://github.com/felixthe8/careaway-server.git`
2. Create a data folder to house your mongo data
   * On terminal it's `mkdir data`
3. Start mongodb database `mongod --port 27017 --dbpath /path/to/data/folder/data`
4. Go into the project's folder `cd careaway-server` and run `node services` to start the server

### Dependencies
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

### Mongo DB Setup
* These are the Mongo shell commands to create the list of supported conditions in the database. First, open a Mongo terminal by typing `mongo`

```
use CareAway
```
```
db.createCollection(“Conditions”)
```

```
db.Conditions.insert({Condition: ["Asthma","Generalized Anxiety Disorder", "Diabetes", "High Blood Pressure", "Panic Disorder", "Social Anxiety Disorder" ]})
```

## Module Aliases
#### Description
The `module-alias` library allows the following aliases to be used throughout the files on the server. It encapsulates the routes to each of these locations within the server to make the importing files both cleaner and less error-prone.
`@root`

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


## Development Setup

1. Install MongoDB through Homebrew
   > Install [Homebrew](https://brew.sh/)  
   > Install MongoDB through Homebrew: ```  brew install mongodb ```  
   > Create the local Mongo database: ```  mkdir -p /data/db ```  
   > Run the Mongo database: ```  mongod ```  
   > (Optional) On a separate terminal, run the mongo client: ``` mongo```  
   > For assistance with MongoDB setup, click [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

2. Start the CareAway server locally
``` bash
  cd careaway-server
  npm install
  node services
```
3. View Frontend
``` bash
  cd careaway-app
  npm install
  npm run dev
```

## Acknowledgments
* [Taylor Tobin](https://github.com/19TT94) 
* [Eugene Mesina](https://github.com/EugeneMesina)
* [Crystal Chun](https://github.com/CrystalChun)
* [Jimmy Chao](https://github.com/Lazer7)
* [Tyler Dao](https://github.com/fireclimbers) 

