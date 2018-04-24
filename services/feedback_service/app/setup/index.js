const dbConnection = require('@dataAccess/db_connection');

// Feedback repository
const FeedbackRepo = require('@dataAccess/feedback_repository');

// Feedback model
const Feedback = require('@models/feedback')

module.exports = {
	DB: new dbConnection().Connect(),
    FeedbackRepo: FeedbackRepo,
    Feedback: Feedback
};
