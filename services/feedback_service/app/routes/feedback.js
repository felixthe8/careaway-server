const config = require('@feedbackConfig');
const models = require('@feedbackModels');
const api = require('@feedbackAPI/feedback');

module.exports = (app) => {
    // GET /feedback/api/feedback
    // Retrieve all the feedbacks
    app.route(config.routes.feedback).get(api.queryFeedback(models.FeedbackRepo, models.DB));
    
    // POST /feedback/api/feedback
    // Create a feedback
    app.route(config.routes.feedback).post(api.createFeedback(models.FeedbackRepo, models.Feedback, models.DB));
    
    // PUT /feedback/api/feedback
    // Edit a feedback
    app.route(config.routes.feedback).put(api.editFeedback(models.FeedbackRepo, models.DB));

}