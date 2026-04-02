const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'lawyer'], default: 'user' },
  // Lawyer profile reference if role is lawyer
  lawyerProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
