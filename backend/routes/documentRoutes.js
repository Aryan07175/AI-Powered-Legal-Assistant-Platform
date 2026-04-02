const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');

router.post('/', auth, documentController.saveGeneratedDocument);
router.get('/', auth, documentController.getUserDocuments);
router.get('/:id', auth, documentController.getDocumentById);

module.exports = router;
