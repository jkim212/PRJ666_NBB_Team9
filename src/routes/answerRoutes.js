const aswerController = require('../controllers/answerController');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/createAnswer/:id', authenticate, aswerController.createAnswer);
router.get('/getAnswers/:id', authenticate, aswerController.getAsnwers);
router.delete('/deleteAnswer/:id', authenticate, aswerController.deleteAnswer);
router.get('/answerByUser', authenticate, aswerController.answerByUser);

module.exports = router;