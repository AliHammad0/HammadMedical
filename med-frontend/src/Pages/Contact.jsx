
import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaCheck
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactDetails = [
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      detail: 'Send us your questions through our contact form.',
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Phone Number',
      detail: 'Contact our team for personal assistance.',
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      detail: 'Our team is available to assist with your inquiries.',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Our Location',
      detail: 'Get in touch to learn more about our location.',
    },
  ];

  const inputStyle =
    'w-full bg-[#f8f7f4] border border-[#e9e5dc] rounded-xl px-5 py-4 text-sm text-[#263844] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#b99b65] focus:bg-white focus:ring-4 focus:ring-[#b99b65]/10';

  return (
    <section className="min-h-screen bg-[#f8f7f4] py-20 md:py-28 font-[Arial,sans-serif]">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Page Heading */}
        <div className="max-w-3xl mb-16">

          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-[#b99b65]"></span>
            <span className="text-[#a68b5c] text-xs font-bold uppercase tracking-[3px]">
              Get In Touch
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#172b38] leading-[1.15] mb-7">
            We're Here
            <br />
            <span className="font-normal italic text-[#b99b65]">
              For Your Health.
            </span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-8 max-w-2xl">
            Your health and well-being matter to us. Whether you have a
            question, need assistance, or want to learn more about our
            services, our team is always ready to help.
          </p>

        </div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] bg-white rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(23,43,56,0.08)] border border-[#eeeae2]">

          {/* Left Contact Information */}
          <div className="relative bg-[#172b38] text-white p-8 sm:p-10 lg:p-14 overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute -right-32 -top-28 w-96 h-96 rounded-full border border-[#b99b65]/20"></div>
            <div className="absolute -right-20 -top-16 w-72 h-72 rounded-full border border-[#b99b65]/20"></div>
            <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#b99b65]/5"></div>

            <div className="relative z-10">

              <span className="text-[#c9ad7b] text-xs font-bold uppercase tracking-[3px]">
                Contact Information
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mt-6 mb-6">
                Let's Make Your
                <span className="block text-[#c9ad7b] font-normal italic mt-1">
                  Health Our Priority.
                </span>
              </h2>

              <p className="text-gray-300 text-sm leading-8 mb-12 max-w-sm">
                We believe that great healthcare begins with great
                communication. Reach out and let us help you.
              </p>

              {/* Contact Details */}
              <div className="space-y-9">

                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start gap-5 group">

                    <div className="w-12 h-12 shrink-0 rounded-xl border border-[#c9ad7b]/30 bg-white/5 flex items-center justify-center text-[#c9ad7b] text-lg transition-all duration-300 group-hover:bg-[#b99b65] group-hover:text-white">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-sm mb-2 tracking-wide">
                        {item.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-6 max-w-xs">
                        {item.detail}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              {/* Bottom Note */}
              <div className="mt-14 pt-8 border-t border-white/10">
                <p className="text-[#c9ad7b] text-xs uppercase tracking-[2px] font-bold mb-3">
                  Your Health Matters
                </p>

                <p className="text-gray-400 text-sm leading-7">
                  Dedicated to providing professional care and a better
                  healthcare experience.
                </p>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 sm:p-10 lg:p-14">

            <div className="mb-10">

              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[1px] bg-[#b99b65]"></span>
                <span className="text-[#a68b5c] text-xs font-bold uppercase tracking-[2px]">
                  Send A Message
                </span>
              </div>

              <h2 className="text-3xl font-bold text-[#172b38] mb-4">
                How Can We Help?
              </h2>

              <p className="text-gray-500 text-sm leading-7">
                Complete the form below and our team will be ready to
                assist you with your inquiry.
              </p>

            </div>

            {submitted ? (

              /* Success Message */
              <div className="bg-[#f8f7f4] border border-[#e9e2d5] rounded-2xl p-8 sm:p-10 text-center">

                <div className="w-16 h-16 rounded-full bg-[#172b38] text-[#c9ad7b] flex items-center justify-center mx-auto mb-6 text-2xl">
                  <FaCheck />
                </div>

                <h3 className="text-2xl font-bold text-[#172b38] mb-4">
                  Thank You!
                </h3>

                <p className="text-gray-500 text-sm leading-7 mb-7">
                  Your message has been submitted in this form.
                  Connect a backend or email service to receive messages.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[#a68b5c] font-bold text-sm border-b border-[#b99b65] pb-1 hover:text-[#172b38] transition"
                >
                  Send Another Message
                </button>

              </div>

            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name and Email */}
                <div className="grid sm:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-xs font-bold text-[#263844] uppercase tracking-wider mb-3">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#263844] uppercase tracking-wider mb-3">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className={inputStyle}
                    />
                  </div>

                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-[#263844] uppercase tracking-wider mb-3">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is your inquiry about?"
                    required
                    className={inputStyle}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#263844] uppercase tracking-wider mb-3">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="6"
                    required
                    className={`${inputStyle} resize-none`}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto min-w-[190px] flex items-center justify-center gap-4 bg-[#172b38] hover:bg-[#b99b65] text-white font-bold text-xs uppercase tracking-[1.5px] px-9 py-5 rounded-xl transition-all duration-300 shadow-lg shadow-[#172b38]/10"
                >
                  Send Message
                  <FaPaperPlane className="text-sm" />
                </button>

                <p className="text-xs text-gray-400 leading-6">
                  Your information will be handled with care and privacy.
                </p>

              </form>

            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
