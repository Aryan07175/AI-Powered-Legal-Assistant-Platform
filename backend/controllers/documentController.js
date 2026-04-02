const Document = require('../models/Document');

exports.saveGeneratedDocument = async (req, res) => {
  const { title, type, content } = req.body;
  try {
    const newDoc = new Document({
      title, type, content, ownerId: req.user.id
    });
    const doc = await newDoc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getUserDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc || doc.ownerId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Document not found or unauthorized' });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
