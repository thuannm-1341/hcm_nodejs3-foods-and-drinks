import { FeedbackController } from './../controllers/feedback.controller';
import { Router } from 'express';

const feedbackRoute: Router = Router();
const feedbackController = new FeedbackController();

feedbackRoute.post('/', feedbackController.createFeedback);
feedbackRoute.put('/', feedbackController.updateFeedback);

export default feedbackRoute;
