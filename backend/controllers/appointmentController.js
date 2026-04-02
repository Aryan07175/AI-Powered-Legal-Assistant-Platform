const Appointment = require('../models/Appointment');
const Lawyer = require('../models/Lawyer');
const { v4: uuidv4 } = require('uuid');

exports.bookAppointment = async (req, res) => {
  const { lawyerId, date, time } = req.body;
  try {
    const meetingLink = uuidv4(); // Generate a unique room ID for WebRTC
    const newAppointment = new Appointment({
      userId: req.user.id,
      lawyerId,
      date,
      time,
      meetingLink
    });
    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'lawyer') {
      const lawyer = await Lawyer.findOne({ user: req.user.id });
      if (!lawyer) return res.status(404).json({ msg: 'Lawyer profile not found' });
      appointments = await Appointment.find({ lawyerId: lawyer._id }).populate('userId', ['name', 'email']);
    } else {
      appointments = await Appointment.find({ userId: req.user.id }).populate({
        path: 'lawyerId',
        populate: { path: 'user', select: 'name email' }
      });
    }
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
