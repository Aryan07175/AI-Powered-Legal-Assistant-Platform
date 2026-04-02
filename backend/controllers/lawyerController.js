const Lawyer = require('../models/Lawyer');

exports.getLawyers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.specialization) {
      filters.specialization = new RegExp(req.query.specialization, 'i');
    }
    const lawyers = await Lawyer.find(filters).populate('user', ['name', 'email']);
    res.json(lawyers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id).populate('user', ['name', 'email']);
    if (!lawyer) {
      return res.status(404).json({ msg: 'Lawyer not found' });
    }
    res.json(lawyer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
