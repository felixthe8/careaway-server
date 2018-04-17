function Feedback (feedback) {
  this.feedback = feedback || "";
  this.created_at = new Date(Date.now());
  this.seen = false;
}

Feedback.prototype.setSeen = function (seen) {
  this.seen = seen;
}

module.exports = Feedback;