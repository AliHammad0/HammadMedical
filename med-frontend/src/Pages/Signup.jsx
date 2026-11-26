
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaStethoscope,
  FaHeart,
} from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    'w-full bg-[#f8f7f4] border border-[#e9e5dc] rounded-xl pl-12 pr-12 py-4 text-sm text-[#263844] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#b99b65] focus:bg-white focus:ring-4 focus:ring-[#b99b65]/10';

  return (
    <section className="min-h-screen bg-[#f8f7f4] flex items-center justify-center py-16 px-5 font-[Arial,sans-serif]">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(23,43,56,0.10)] border border-[#eeeae2]">

        <div className="hidden lg:flex relative bg-[#172b38] text-white p-14 flex-col justify-between overflow-hidden">
          <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-[#c9ad7b]/20" />
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-[#c9ad7b]/20" />
          <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-[#c9ad7b]/5" />

          <Link to="/home" className="relative z-10 inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-[#c9ad7b] rounded-xl flex items-center justify-center text-[#172b38] text-xl">
              <FaStethoscope />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">MEDICARE</h2>
              <p className="text-[10px] text-[#c9ad7b] tracking-[3px] uppercase">
                Health & Wellness
              </p>
            </div>
          </Link>

          <div className="relative z-10 max-w-md">
            <span className="text-[#c9ad7b] text-xs font-bold uppercase tracking-[3px]">
              Join Our Community
            </span>
            <h1 className="text-5xl font-bold leading-tight mt-6 mb-7">
              Begin Your
              <span className="block text-[#c9ad7b] italic font-normal">
                Wellness Journey.
              </span>
            </h1>
            <p className="text-gray-300 leading-8 text-sm">
              Create your account to stay connected with healthcare services
              and manage your medical experience in one place.
            </p>
            <div className="mt-10 flex items-center gap-3 text-sm text-gray-300">
              <FaHeart className="text-[#c9ad7b]" />
              Better Care Starts With You.
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Medicare. All rights reserved.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <Link to="/home" className="lg:hidden inline-flex items-center gap-3 mb-9">
            <div className="w-11 h-11 bg-[#172b38] rounded-xl flex items-center justify-center text-[#c9ad7b]">
              <FaStethoscope />
            </div>
            <div>
              <h2 className="font-bold text-[#172b38]">MEDICARE</h2>
              <p className="text-[9px] text-[#a68b5c] tracking-[2px] uppercase">
                Health & Wellness
              </p>
            </div>
          </Link>

          <div className="mb-9">
            <span className="text-[#a68b5c] text-xs font-bold uppercase tracking-[3px]">
              Create Your Account
            </span>
            <h2 className="text-4xl font-bold text-[#172b38] mt-4 mb-4">
              Sign Up
            </h2>
            <p className="text-gray-500 text-sm leading-7">
              Join us and create your personal healthcare account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#263844] mb-3">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b99b65]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#263844] mb-3">
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
                  autoComplete="email"
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#263844] mb-3">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b99b65]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a68b5c]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#263844] mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b99b65]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  className={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a68b5c]"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#172b38] hover:bg-[#b99b65] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-[2px] py-5 rounded-xl transition-all duration-300 mt-3"
            >
              {loading ? 'Creating Account...' : 'Create Your Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#a68b5c] font-bold hover:text-[#172b38]">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-9 pt-6 border-t border-[#eeeae2] text-center">
            <Link to="/home" className="text-xs text-gray-400 hover:text-[#a68b5c]">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
