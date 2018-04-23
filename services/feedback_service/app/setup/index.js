const dbConnection = require('@dataAccess/db_connection');

// feedback repository
const FeedbackRepo = require('@dataAccess/feedback_repository');

// feedback model
const Feedback = require('@models/feedback')

module.exports = {
	DB: new dbConnection().Connect(),
    FeedbackRepo: FeedbackRepo,
    Feedback: Feedback
};
