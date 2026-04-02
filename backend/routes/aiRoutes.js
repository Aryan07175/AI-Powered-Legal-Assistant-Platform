const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/chat', auth, aiController.askLegalQuestion);
router.post('/generate-document', auth, aiController.generateDocument);

module.exports = router;
