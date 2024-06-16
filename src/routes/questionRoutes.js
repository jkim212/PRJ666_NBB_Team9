const express = require('express');
const router = express.Router();
const questionPostController = require('../controllers/questionPostController');
const authenticate = require('../middleware/authenticate');
const questionGetController = require('../controllers/questionGetController');

// Route to create a new question (using POST)
router.post('/createQuestion', authenticate, questionPostController.createQuestion);
router.get('/getQuestions', authenticate, questionGetController.getQuestions);
router.get('/getQuestionsbyUser', authenticate, questionGetController.getQuestionsbyUser);
router.get('/getQuestion/:id', authenticate, questionGetController.getQuestion);

module.exports = router;
