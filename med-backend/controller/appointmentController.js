
import Appointment from '../models/appointments.js';

// Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      doctor,
      department,
      date,
      time,
      message
    } = req.body;

    // Required Fields Validation
    if (!name || !email || !phone || !department || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required appointment details.'
      });
    }

    // Check Appointment Date
    const appointmentDate = new Date(date);

    if (Number.isNaN(appointmentDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid appointment date.'
      });
    }

    if (appointmentDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date cannot be in the past.'
      });
    }

    // Create Appointment
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      doctor,
      department,
      date: appointmentDate,
      time,
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      appointment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      total: appointments.length,
      appointments
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Appointment
export const getSingleAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.'
      });
    }

    return res.status(200).json({
      success: true,
      appointment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Appointment Status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      'Pending',
      'Confirmed',
      'Completed',
      'Cancelled'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment status.'
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully.',
      appointment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully.'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
