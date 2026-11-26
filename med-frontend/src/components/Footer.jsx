
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Primary Care", path: "/services" },
    { name: "Emergency Care", path: "/services" },
    { name: "Specialist Consultation", path: "/services" },
    { name: "Diagnostic Services", path: "/services" },
    { name: "Health Checkups", path: "/services" }
  ];

  const departments = [
    { name: "Cardiology", path: "/services" },
    { name: "Neurology", path: "/services" },
    { name: "Pediatrics", path: "/services" },
    { name: "Orthopedics", path: "/services" },
    { name: "General Medicine", path: "/services" }
  ];

  const quickLinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Our Products", path: "/products" },
    { name: "Contact Us", path: "/contact" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com" },
    { name: "Twitter", icon: FaTwitter, url: "https://twitter.com" }
  ];

  const FooterLink = ({ to, children }) => (
    <li>
      <Link
        to={to}
        className="text-sm text-gray-400 hover:text-[#c5a675] transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <footer className="bg-[#172832] text-white font-[Arial]">

      {/* Top Gold Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#172832] via-[#c5a675] to-[#172832]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 md:pt-20">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16">

          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-[#c5a675] flex items-center justify-center">
                <span className="text-[#172832] text-2xl font-bold">
                  M
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-[1px] text-white">
                  MediCare
                </h2>

                <p className="text-[8px] text-[#c5a675] uppercase tracking-[3px] mt-1">
                  Health & Wellness
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 mt-8 mb-5">
              <span className="w-8 h-px bg-[#c5a675]" />
              <p className="text-[10px] text-[#c5a675] uppercase tracking-[3px] font-semibold">
                Your Health, Our Priority
              </p>
            </div>

            <p className="text-sm text-gray-400 leading-8 max-w-sm">
              Your trusted partner in healthcare. We are committed to
              supporting your wellbeing through quality healthcare services,
              medical products and compassionate care.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 border border-white/15 flex items-center justify-center text-gray-400 hover:bg-[#c5a675] hover:border-[#c5a675] hover:text-[#172832] transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs text-white font-bold uppercase tracking-[2px]">
              Our Services
            </h3>

            <div className="w-8 h-px bg-[#c5a675] mt-4 mb-7" />

            <ul className="space-y-4">
              {services.map((service) => (
                <FooterLink key={service.name} to={service.path}>
                  {service.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="lg:col-span-2">
            <h3 className="text-xs text-white font-bold uppercase tracking-[2px]">
              Departments
            </h3>

            <div className="w-8 h-px bg-[#c5a675] mt-4 mb-7" />

            <ul className="space-y-4">
              {departments.map((department) => (
                <FooterLink key={department.name} to={department.path}>
                  {department.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs text-white font-bold uppercase tracking-[2px]">
              Quick Links
            </h3>

            <div className="w-8 h-px bg-[#c5a675] mt-4 mb-7" />

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <FooterLink key={link.name} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-xs text-white font-bold uppercase tracking-[2px]">
              Get In Touch
            </h3>

            <div className="w-8 h-px bg-[#c5a675] mt-4 mb-7" />

            <ul className="space-y-6">

              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#c5a675] mt-1 text-sm shrink-0" />

                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[1.5px] mb-2">
                    Call Us
                  </p>

                  <a
                    href="tel:+11234567890"
                    className="text-xs text-gray-300 hover:text-[#c5a675] transition-colors"
                  >
                    +1 123 456 7890
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#c5a675] mt-1 text-sm shrink-0" />

                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[1.5px] mb-2">
                    Email Us
                  </p>

                  <a
                    href="mailto:info@medicalcenter.com"
                    className="text-xs text-gray-300 hover:text-[#c5a675] transition-colors break-all"
                  >
                    info@medicalcenter.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#c5a675] mt-1 text-sm shrink-0" />

                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[1.5px] mb-2">
                    Our Location
                  </p>

                  <p className="text-xs text-gray-300 leading-6">
                    123 Health Street,
                    <br />
                    Medical District
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FaClock className="text-[#c5a675] mt-1 text-sm shrink-0" />

                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[1.5px] mb-2">
                    Working Hours
                  </p>

                  <p className="text-xs text-gray-300 leading-6">
                    Monday - Saturday
                    <br />
                    9:00 AM - 8:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Appointment Banner */}
        <div className="border-t border-white/10 border-b border-white/10 py-9 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] text-[#c5a675] uppercase tracking-[3px] mb-3">
              We're Here For You
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-white">
              Take the first step towards better health.
            </h3>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-4 px-7 py-4 bg-[#c5a675] text-[#172832] text-[10px] font-bold uppercase tracking-[1.5px] hover:bg-white transition-all duration-300"
          >
            Book An Appointment
            <FaArrowRight />
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="py-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[10px] text-gray-500 text-center md:text-left tracking-wide">
            © {currentYear} MediCare. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-[10px] text-gray-500 hover:text-[#c5a675] transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-[10px] text-gray-500 hover:text-[#c5a675] transition-colors"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/contact"
              className="text-[10px] text-gray-500 hover:text-[#c5a675] transition-colors"
            >
              Contact
            </Link>
          </div>

          <p className="text-[9px] text-[#c5a675] uppercase tracking-[2px]">
            Care • Quality • Wellness
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
