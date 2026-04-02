const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/', auth, appointmentController.bookAppointment);
router.get('/', auth, appointmentController.getAppointments);
router.put('/:id', auth, appointmentController.updateAppointmentStatus);

module.exports = router;
