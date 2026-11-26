
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEdit,
  FaSave,
  FaSignOutAlt,
  FaStethoscope,
  FaArrowLeft,
} from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load profile.');
        }

        const user = data.user;

        setFormData({
          name: user.name || '',
          email: user.email || '',
          password: '',
        });

        localStorage.setItem('name', user.name || '');
        localStorage.setItem('email', user.email || '');
      } catch (err) {
        setError(err.message);

        if (
          err.message.toLowerCase().includes('token') ||
          err.message.toLowerCase().includes('authorized') ||
          err.message.toLowerCase().includes('expired')
        ) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    setUpdating(true);

    try {
      const token = localStorage.getItem('token');

      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Profile update failed.');
      }

      const updatedUser = data.user;

      setFormData({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        password: '',
      });

      localStorage.setItem('name', updatedUser.name || '');
      localStorage.setItem('email', updatedUser.email || '');

      setMessage('Your profile has been updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4] font-[Arial]">
        <p className="text-[#172b38] font-semibold">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f7f4] px-5 py-14 font-[Arial,sans-serif]">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/home"
              className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#b99b65]"
            >
              <FaArrowLeft />
              Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-[#172b38] sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your personal account information.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-[#eeeae2] bg-white shadow-[0_15px_50px_rgba(23,43,56,0.07)]">

          {/* Profile Banner */}
          <div className="bg-[#172b38] px-8 py-10 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#c9ad7b] bg-white text-4xl text-[#172b38]">
              <FaUser />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              {formData.name || 'User'}
            </h2>

            <p className="mt-2 text-sm text-[#c9ad7b]">
              Medicare Account
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#172b38]">
                Personal Information
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Update your account details below.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-6 rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
                {message}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-6">

              {/* Name */}
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#263844]">
                  Full Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-[#e9e5dc] bg-[#f8f7f4] py-4 pl-12 pr-5 text-sm text-[#263844] outline-none transition focus:border-[#b99b65] focus:ring-4 focus:ring-[#b99b65]/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#263844]">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-[#e9e5dc] bg-[#f8f7f4] py-4 pl-12 pr-5 text-sm text-[#263844] outline-none transition focus:border-[#b99b65] focus:ring-4 focus:ring-[#b99b65]/10"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#263844]">
                  New Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b99b65]" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password (optional)"
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#e9e5dc] bg-[#f8f7f4] py-4 pl-12 pr-5 text-sm text-[#263844] outline-none transition focus:border-[#b99b65] focus:ring-4 focus:ring-[#b99b65]/10"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Leave blank if you do not want to change your password.
                </p>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#172b38] py-5 text-xs font-bold uppercase tracking-[2px] text-white transition hover:bg-[#b99b65] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating ? (
                  'Updating Profile...'
                ) : (
                  <>
                    <FaSave />
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-400">
          <FaStethoscope className="text-[#b99b65]" />
          Medicare Health & Wellness
        </div>
      </div>
    </section>
  );
};

export default Profile;
