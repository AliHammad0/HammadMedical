
import express from 'express';

import {
  bookAppointment,
  getAppointments,
  getSingleAppointment,
  updateAppointmentStatus,
  deleteAppointment
} from '../controller/appointmentController.js';

const appointmentRoutes = express.Router();

// Book Appointment
appointmentRoutes.post('/book', bookAppointment);

// Get All Appointments
appointmentRoutes.get('/', getAppointments);

// Get Single Appointment
appointmentRoutes.get('/:id', getSingleAppointment);

// Update Appointment Status
appointmentRoutes.put('/:id/status', updateAppointmentStatus);

// Delete Appointment
appointmentRoutes.delete('/:id', deleteAppointment);

export default appointmentRoutes;
