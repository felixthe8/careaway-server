/* Question Object for Checklist Widget
 *
 * description: string question and boolean (False) flag
 */
function Question (question) {
  this.question = question || '';
  this.check = false;
}
Question.prototype.setQuestion = function(question) {
  this.question = question;
}
// When the user marks a checklist task as completed, flip the boolean flag
Question.prototype.setCheck = function() {
  this.check = !this.check;
}
module.exports = Question;