/**
 * Meter Widget Model
 * 
 * question inquirying the patient of the status of their diagnosis 
 * scale the measurement of patient's status
 * due the deadline of the treatment
 */
function Meter (question,scale, due) {
  // for db table
  this.label = "meter"
  this.question = question || '';
  this.scale = scale || [];
  this.due_date = due || new Date(Date.now());
  this.created_at = new Date(Date.now());
  this.updated_at = null;
}  
// set question
Meter.prototype.setQuestion = function (question) {
  this.question = question;  
  this.updated_at = new Date(Date.now());
}  
// set scale (ex: setScale(1,10))
Meter.prototype.setScale = function (low, high) {
  this.scale = [ low, high ];
  this.updated_at = new Date(Date.now());
}
module.exports = Meter;


