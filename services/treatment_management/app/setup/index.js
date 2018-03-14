const dbConnection = require('@dataAccess/db_connection');

const TreatmentRepo = require('@dataAccess/treatment_plan_repository');

const Checklist = require('@models/checklist')
const Meter = require('@models/meter')
const Question = require('@models/questions')

//const treatmentModel = require('@treatmentModels/treatment_plan');

const model = {
  DB: new dbConnection().Connect(),
  TreatmentRepo: TreatmentRepo,
  Checklist: Checklist,
  Meter: Meter,
  Question: Question
  //treatmentPlan : treatmentModel,
}
module.exports = model;