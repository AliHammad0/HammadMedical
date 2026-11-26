
import React from 'react';
import {
  FaFileContract,
  FaCalendarCheck,
  FaUserMd,
  FaShieldAlt,
  FaCapsules,
  FaCreditCard,
  FaExclamationTriangle,
  FaEnvelope
} from 'react-icons/fa';

const Terms = () => {
  const sections = [
    {
      icon: <FaFileContract />,
      title: '1. Acceptance of Terms',
      content: [
        'By accessing or using the MEDICARE website, you agree to follow these Terms & Conditions.',
        'If you do not agree with any part of these terms, please discontinue using our website and services.'
      ]
    },
    {
      icon: <FaUserMd />,
      title: '2. Medical Disclaimer',
      content: [
        'The information provided on this website is for general informational and educational purposes only.',
        'Website content is not a substitute for professional medical advice, diagnosis or treatment.',
        'Always consult a qualified healthcare professional regarding your medical condition. In an emergency, contact your local emergency service immediately.'
      ]
    },
    {
      icon: <FaCalendarCheck />,
      title: '3. Appointments',
      content: [
        'Users may request appointments through our online booking system.',
        'Submitting an appointment request does not automatically guarantee confirmation.',
        'Appointment availability depends on doctor schedules and clinic availability.',
        'Please provide accurate personal and contact information when booking.',
        'For cancellations or rescheduling, contact our support team in advance.'
      ]
    },
    {
      icon: <FaUserMd />,
      title: '4. Doctors and Healthcare Services',
      content: [
        'Doctor profiles and specialties are provided to help users explore available healthcare services.',
        'Actual doctor availability, consultation fees and schedules may change.',
        'Medical decisions and treatment plans remain the responsibility of the qualified healthcare professional.'
      ]
    },
    {
      icon: <FaCapsules />,
      title: '5. Products and Orders',
      content: [
        'Product descriptions, prices and availability are subject to change without prior notice.',
        'Users are responsible for checking product information before placing an order.',
        'Orders may be subject to availability and verification.',
        'Prescription-required products must only be purchased and used in accordance with applicable laws and valid prescriptions.',
        'We reserve the right to cancel an order if a product is unavailable or an order cannot be verified.'
      ]
    },
    {
      icon: <FaCreditCard />,
      title: '6. Payments and Refunds',
      content: [
        'Available payment methods will be displayed during the checkout process.',
        'Users must provide accurate billing and payment information.',
        'Order confirmation may depend on successful payment verification.',
        'Refunds, returns and exchanges are subject to the applicable policies displayed by MEDICARE.'
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: '7. User Accounts',
      content: [
        'Users must provide accurate information when creating an account.',
        'You are responsible for keeping your login credentials confidential.',
        'You must not use another person’s account without permission.',
        'MEDICARE may restrict or suspend accounts involved in unauthorized or harmful activities.'
      ]
    },
    {
      icon: <FaExclamationTriangle />,
      title: '8. Prohibited Activities',
      content: [
        'Using the website for illegal or fraudulent activities.',
        'Providing false or misleading information.',
        'Attempting to access restricted areas without authorization.',
        'Disrupting website functionality or attempting to compromise its security.',
        'Copying or misusing website content without permission.'
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: '9. Limitation of Liability',
      content: [
        'MEDICARE aims to provide accurate and reliable information but does not guarantee that all website content will always be complete or error-free.',
        'To the extent permitted by applicable law, MEDICARE is not responsible for indirect losses resulting from website use or service interruptions.',
        'Nothing in these terms excludes liability where applicable law does not allow such exclusion.'
      ]
    },
    {
      icon: <FaFileContract />,
      title: '10. Changes to These Terms',
      content: [
        'MEDICARE may update these Terms & Conditions when necessary.',
        'Updated terms will be published on this page. Continued use of the website after changes are published indicates acceptance of the updated terms, to the extent permitted by law.'
      ]
    },
    {
      icon: <FaEnvelope />,
      title: '11. Contact Information',
      content: [
        'If you have questions about these Terms & Conditions, please contact us through our Contact page.',
        'Our support team will assist you with your questions and concerns.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-[Arial] text-[#172b38]">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#172b38] px-5 py-24 text-center sm:py-28">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border border-[#c9ad7b]/20" />
        <div className="absolute -bottom-36 -right-20 h-96 w-96 rounded-full border border-[#c9ad7b]/20" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c9ad7b]/40 bg-white/5 text-3xl text-[#c9ad7b]">
            <FaFileContract />
          </div>

          <span className="text-xs font-bold uppercase tracking-[4px] text-[#c9ad7b]">
            Legal Information
          </span>

          <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">
            Terms & <span className="text-[#c9ad7b]">Conditions</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/65 sm:text-base">
            Please read these terms carefully before using MEDICARE
            healthcare services, appointments and online products.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2 text-xs text-white/70">
            Last Updated: November 25, 2026
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-5xl px-5 pt-16">
        <div className="rounded-2xl border border-[#c9ad7b]/30 bg-white p-7 shadow-sm sm:p-10">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#b99b65]">
            Welcome to MEDICARE
          </span>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Our Terms of Service
          </h2>

          <p className="mt-5 text-sm leading-8 text-gray-500">
            These Terms & Conditions govern your access to and use of the
            MEDICARE website and its services. By using our website, creating
            an account, booking an appointment or placing an order, you agree
            to these terms and applicable laws.
          </p>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#b99b65]">
            Terms of Use
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Please Read Carefully
          </h2>
        </div>

        <div className="space-y-5">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:border-[#c9ad7b]/50 hover:shadow-md sm:p-9"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#172b38] text-lg text-[#c9ad7b]">
                  {section.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold sm:text-xl">
                    {section.title}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {section.content.map((paragraph, paragraphIndex) => (
                      <div
                        key={paragraphIndex}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9ad7b]" />
                        <p className="text-sm leading-7 text-gray-500">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#172b38] px-7 py-14 text-center sm:px-12">
          <FaEnvelope className="mx-auto text-3xl text-[#c9ad7b]" />

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Have Questions About Our Terms?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
            If you need clarification about our terms or services,
            our team is here to help.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-[#c9ad7b] px-8 py-4 text-sm font-bold text-[#172b38] transition hover:bg-white"
          >
            Contact Our Team
          </a>
        </div>
      </section>

    </div>
  );
};

export default Terms;
