// Feedback model that stores a user's feedback and whether the feedback has been seen or not
function Feedback (feedback) {
  this.feedback = feedback || "";
  this.created_at = new Date(Date.now());
  this.seen = false;
}

// Set the seen property to either true or false
Feedback.prototype.setSeen = function (seen) {
  this.seen = seen;
}

module.exports = Feedback;