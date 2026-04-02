const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true }, // years of experience
  rating: { type: Number, default: 0 },
  hourlyRate: { type: Number, required: true },
  availability: [{ type: String }], // e.g. ["Monday 10AM-2PM", "Tuesday 3PM-5PM"]
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);
