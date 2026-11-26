
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    doctor: {
      type: String,
      trim: true,
      default: 'Any Available Doctor'
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      trim: true,
      default: ''
    },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
