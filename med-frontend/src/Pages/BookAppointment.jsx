
import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
  FaCheckCircle,
  FaHeartbeat,
  FaTimes
} from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    department: '',
    date: '',
    time: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: '', text: '' });
    setShowSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Appointment booking failed');
      }

      setMessage({
        type: 'success',
        text: data.message || 'Appointment booked successfully.'
      });

      setShowSuccess(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        doctor: '',
        department: '',
        date: '',
        time: '',
        message: ''
      });

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-4 py-16 font-[Arial] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eae6dc] px-5 py-2 text-sm font-semibold text-[#a18450]">
            <FaHeartbeat />
            Your Health Matters
          </span>

          <h1 className="text-3xl font-bold text-[#172b38] sm:text-4xl lg:text-5xl">
            Book Your Appointment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Schedule your visit with our experienced medical professionals.
            We are here to provide you with the best healthcare experience.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left Panel */}
          <div className="flex flex-col justify-between bg-[#172b38] p-8 text-white sm:p-10 lg:p-12">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[3px] text-[#c9ad7b]">
                Medicare Healthcare
              </span>

              <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                Quality Care Starts With One Appointment.
              </h2>

              <p className="mt-6 text-sm leading-7 text-gray-300">
                Take the first step towards better health. Fill out the
                appointment form and our team will assist you.
              </p>

              <div className="mt-12 space-y-8">

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl text-[#c9ad7b]">
                    <FaUserMd />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert Doctors</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Experienced medical professionals
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl text-[#c9ad7b]">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold">Easy Scheduling</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Choose your preferred date and time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl text-[#c9ad7b]">
                    <FaHeartbeat />
                  </div>
                  <div>
                    <h3 className="font-semibold">Patient First</h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Your health is our priority
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-12 border-t border-white/15 pt-6">
              <p className="text-sm text-gray-400">
                MEDICARE — Health & Wellness
              </p>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="p-6 sm:p-10 lg:p-12">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#172b38]">
                Appointment Details
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please provide your information below.
              </p>
            </div>

            {/* Error Message */}
            {message.type === 'error' && (
              <div className="mb-6 animate-[fadeIn_0.4s_ease-out] rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Full Name *
                  </label>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Email Address *
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Phone Number *
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                    />
                  </div>
                </div>

                {/* Doctor */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Select Doctor
                  </label>

                  <div className="relative">
                    <FaUserMd className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                    >
                      <option value="">Any Available Doctor</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Pediatrician">Pediatrician</option>
                    </select>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Department *
                  </label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-[#b99b65]"
                  >
                    <option value="">Select Department</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Dental Care">Dental Care</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Appointment Date *
                  </label>

                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                    Preferred Time *
                  </label>

                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                    >
                      <option value="">Select Appointment Time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#172b38]">
                  Additional Message
                </label>

                <div className="relative">
                  <FaNotesMedical className="absolute left-4 top-4 text-[#b99b65]" />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your concern (optional)"
                    className="w-full resize-none rounded-lg border border-gray-200 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b99b65]"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#172b38] px-6 py-4 text-sm font-bold text-white transition duration-300 hover:bg-[#b99b65] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Booking Appointment...' : 'Book Appointment'}
              </button>

              <p className="text-center text-xs text-gray-400">
                Our team will contact you to confirm your appointment.
              </p>

            </form>
          </div>
        </div>
      </div>

      {/* Success Animation Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172b38]/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md animate-[fadeIn_0.4s_ease-out] rounded-3xl bg-white px-7 py-10 text-center shadow-2xl sm:px-10">

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-[#172b38]"
              aria-label="Close success message"
            >
              <FaTimes />
            </button>

            {/* Animated Checkmark */}
            <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full border border-green-400 opacity-20"></div>

              <div className="absolute inset-2 animate-[popIn_0.6s_ease-out] rounded-full bg-green-50"></div>

              <div className="relative flex h-20 w-20 animate-[popIn_0.7s_ease-out] items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-200">
                <FaCheckCircle className="text-5xl" />
              </div>
            </div>

            <span className="text-xs font-bold uppercase tracking-[3px] text-green-600">
              Booking Confirmed
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#172b38]">
              Appointment Booked!
            </h2>

            <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-gray-500">
              {message.text}
            </p>

            <div className="mt-7 rounded-xl bg-[#f5f8f5] p-4">
              <p className="text-sm font-semibold text-green-700">
                Thank you for choosing Medicare!
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Our team will contact you soon to confirm your appointment.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-7 w-full rounded-lg bg-[#172b38] px-6 py-4 text-sm font-bold text-white transition duration-300 hover:bg-[#b99b65]"
            >
              Done
            </button>

          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          70% {
            opacity: 1;
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

    </div>
  );
};

export default BookAppointment;
