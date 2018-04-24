module.exports = {
  // Query all feedbacks in the database
  queryFeedback: (FeedbackRepo, DB) => (req, res) => {
    DB.then(database => {
      var repo = new FeedbackRepo(database);
      // Gets all feedbacks
      repo.GetFeedbacks().then(result => {
        // Returns a json object with key-value of result and array of feedback objects
        res.json(result);
      });
    });
  },
  // Create a new feedback object to store in the database
  createFeedback: (FeedbackRepo, Feedback, DB) => (req, res) => {
    DB.then(database => { 
      const repo = new FeedbackRepo(database);

      // Get feedback from body and create a feedback object from it
      const feedbackMessage = req.body.feedbackMessage;
      const newFeedback = new Feedback(feedbackMessage);

      // Store feedback in database
      repo.Create(newFeedback);
      res.json({success: true});
    }).catch(err => {
      // An error occurred accessing the database.
      res.json({success: false, reason: "Server error. Your request cannot be handled at this time."});
    });
  },
  // Update a feedback object
  editFeedback: (FeedbackRepo, DB) => (req, res) => {
    DB.then(database => { 
      const repo = new FeedbackRepo(database);

      // Get feedback data from body
      const feedback = req.body;

      // Update feedback
      repo.EditFeedback(feedback);
      res.json({success: true});
    }).catch(err => {
      // An error occurred accessing the database.
      res.json({success: false, reason: "Server error. Your request cannot be handled at this time."});
    });
  }
};