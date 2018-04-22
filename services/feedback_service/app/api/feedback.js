const api = {};


api.queryFeedback = (FeedbackRepo, DB) => (req, res) => {
  DB.then(database => {
    var repo = new FeedbackRepo(database);
    // Gets all feedbacks sent to Careaway
    repo.GetFeedbacks().then(result => {
      // Returns a json object with key-value of result and array of feedback objects
      res.json(result);
    });
  });
}

api.createFeedback = (FeedbackRepo, Feedback, DB) => (req, res) => {
  DB.then(database => { 
    const repo = new FeedbackRepo(database);

    const feedbackMessage = req.body.feedbackMessage;
    const newFeedback = new Feedback(feedbackMessage);

    repo.Create(newFeedback);
    res.json({success: true});
  }).catch(err => {
    // An error occurred accessing the database.
    res.json({success: false, reason: "Server error. Your request cannot be handled at this time."});
  });
}

api.editFeedback = (FeedbackRepo, DB) => (req, res) => {
  DB.then(database => { 
    const repo = new FeedbackRepo(database);

    const feedback = req.body;

    repo.EditFeedback(feedback);
    res.json({success: true});
  }).catch(err => {
    // An error occurred accessing the database.
    res.json({success: false, reason: "Server error. Your request cannot be handled at this time."});
  });
}

module.exports = api;