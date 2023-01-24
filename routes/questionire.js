const express = require("express");
const router = express.Router();
const questionireController = require('../controllers/QuestionireController');

router.post('/submit', questionireController.submitQuestionire)
router.get('/questionire', questionireController.getAllUsersQuestionire)
router.post('/question', questionireController.addQuestions)
router.post('/questionire', questionireController.addQuestionire)
router.get('/questions/:questionireId', questionireController.getAllQuestions)
module.exports = router;