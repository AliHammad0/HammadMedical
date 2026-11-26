
import React from 'react';
import {
  FaHeartbeat,
  FaAmbulance,
  FaFlask,
  FaUserMd,
  FaChild,
  FaSyringe,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'General Checkup',
      description: 'Stay on top of your health with comprehensive medical examinations and personalized health assessments.',
      icon: <FaHeartbeat />,
      number: '01',
    },
    {
      id: 2,
      title: 'Emergency Care',
      description: 'Get immediate medical attention from experienced professionals whenever urgent care is needed.',
      icon: <FaAmbulance />,
      number: '02',
    },
    {
      id: 3,
      title: 'Laboratory Tests',
      description: 'Reliable diagnostic testing with accurate results to help doctors make informed decisions.',
      icon: <FaFlask />,
      number: '03',
    },
    {
      id: 4,
      title: 'Surgery & Operation',
      description: 'Advanced surgical procedures performed with professional care and a focus on patient safety.',
      icon: <FaUserMd />,
      number: '04',
    },
    {
      id: 5,
      title: 'Pediatrics',
      description: 'Specialized healthcare services designed to support children through every stage of development.',
      icon: <FaChild />,
      number: '05',
    },
    {
      id: 6,
      title: 'Vaccination',
      description: 'Protect yourself and your family with essential vaccinations and preventive healthcare.',
      icon: <FaSyringe />,
      number: '06',
    },
  ];

  return (
    <section className="bg-[#f7fafc] py-20 md:py-28 font-[Arial,sans-serif]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#e5f5f5] text-[#087f83] text-xs font-bold uppercase tracking-[2px] px-5 py-2.5 rounded-full mb-5">
            <FaHeartbeat />
            Healthcare Services
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#142d3a] leading-tight mb-5">
            Complete Care for a
            <span className="text-[#07999b]"> Healthier Life</span>
          </h2>

          <p className="text-gray-500 text-base sm:text-lg leading-8">
            From routine checkups to specialized treatments, we provide
            quality healthcare focused on your comfort and well-being.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 sm:p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,70,80,0.10)] hover:border-[#b9e5e4]"
            >
              <div className="flex items-center justify-between mb-9">
                <div className="w-16 h-16 rounded-2xl bg-[#eaf7f6] text-[#078d91] flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-[#078d91] group-hover:text-white">
                  {service.icon}
                </div>

                <span className="text-4xl font-bold text-gray-100 group-hover:text-[#d8eeee] transition-colors duration-300">
                  {service.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#183442] mb-3 group-hover:text-[#078d91] transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-500 text-sm leading-7 mb-7">
                {service.description}
              </p>

              <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <FaCheckCircle className="text-[#07999b]" />
                  Professional Care
                </span>

                <span className="w-9 h-9 rounded-full bg-gray-50 text-[#078d91] flex items-center justify-center group-hover:bg-[#078d91] group-hover:text-white transition-all duration-300">
                  <FaArrowRight className="text-sm" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#123442] rounded-3xl px-7 py-10 sm:px-12 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-7">
          <div className="text-center md:text-left">
            <p className="text-[#65d3ce] text-xs font-bold uppercase tracking-[2px] mb-3">
              Your Health Matters
            </p>

            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">
              Need Help Choosing a Service?
            </h3>

            <p className="text-gray-300 text-sm sm:text-base">
              Get in touch with our healthcare team for assistance.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-[#07999b] hover:bg-[#087f83] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap"
          >
            Contact Us
            <FaArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
