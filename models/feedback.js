function Feedback (feedback) {
  this.feedback = feedback || "";
  this.created_at = new Date(Date.now());
  this.seen = false;
}

// add single question objects to checklist
Checklist.prototype.setSeen = function (seen) {
  this.seen = seen;
}

module.exports = Feedback;