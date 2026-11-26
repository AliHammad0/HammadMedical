
import React from 'react';
import {
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaUserMd,
  FaAward,
  FaHeartbeat,
  FaArrowRight,
  FaStethoscope
} from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    specialty: 'General Medicine',
    experience: '15+ Years Experience',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Dedicated to delivering exceptional patient care through medical expertise, compassion and modern healthcare practices.',
    email: 'sarah@medicare.com',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Senior Cardiologist',
    specialty: 'Cardiology',
    experience: '18+ Years Experience',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Specializing in advanced cardiac care, heart disease prevention and modern cardiovascular treatments.',
    email: 'michael@medicare.com',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    role: 'Pediatric Specialist',
    specialty: 'Pediatrics',
    experience: '12+ Years Experience',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Passionate about child wellness, preventive healthcare and providing compassionate care for young patients.',
    email: 'emily@medicare.com',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    role: 'Orthopedic Surgeon',
    specialty: 'Orthopedics',
    experience: '20+ Years Experience',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Expert in joint replacement, orthopedic surgery, sports injuries and advanced mobility treatments.',
    email: 'james@medicare.com',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    role: 'Neurology Specialist',
    specialty: 'Neurology',
    experience: '14+ Years Experience',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Focused on neurological wellness, diagnosis and innovative approaches to neurological treatment.',
    email: 'lisa@medicare.com',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 6,
    name: 'Dr. Robert Martinez',
    role: 'Emergency Specialist',
    specialty: 'Emergency Medicine',
    experience: '16+ Years Experience',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=900',
    description: 'Experienced in emergency medicine, trauma management and providing critical care when it matters most.',
    email: 'robert@medicare.com',
    linkedin: '#',
    twitter: '#'
  }
];

const stats = [
  { number: '50+', label: 'Medical Experts' },
  { number: '15+', label: 'Specialties' },
  { number: '24/7', label: 'Patient Support' },
  { number: '10K+', label: 'Patients Served' }
];

const Team = () => {
  return (
    <section className="overflow-hidden bg-[#f8f7f4] py-20 font-[Arial] lg:py-28">

      {/* Header */}
      <div className="mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#c9ad7b]/40 bg-white px-5 py-2.5">
          <FaUserMd className="text-[#b99b65]" />
          <span className="text-xs font-bold uppercase tracking-[2px] text-[#a18450]">
            Meet Our Medical Team
          </span>
        </div>

        <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#172b38] sm:text-5xl lg:text-6xl">
          The Experts Behind
          <span className="block mt-2 text-[#b99b65]">
            Your Better Health
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
          Meet our experienced healthcare professionals, committed to
          providing personalized medical attention, trusted expertise
          and exceptional patient experiences.
        </p>

        <div className="mx-auto mt-9 h-[2px] w-20 bg-[#b99b65]" />
      </div>

      {/* Statistics */}
      <div className="mx-auto mb-20 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="group rounded-xl border border-[#e9e3d8] bg-white px-4 py-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#b99b65] hover:shadow-lg"
          >
            <h3 className="text-3xl font-bold text-[#172b38] sm:text-4xl">
              {stat.number}
            </h3>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[1.5px] text-gray-500 sm:text-sm">
              {stat.label}
            </p>

            <div className="mx-auto mt-5 h-[2px] w-8 bg-[#b99b65] transition-all duration-300 group-hover:w-16" />
          </div>
        ))}

      </div>

      {/* Doctors */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-[#b99b65]">
              Our Specialists
            </p>

            <h3 className="text-3xl font-bold text-[#172b38] sm:text-4xl">
              Meet Our Doctors
            </h3>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-500">
            A team of dedicated professionals bringing knowledge,
            experience and compassion to every patient.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-[#e9e3d8] bg-white transition duration-500 hover:-translate-y-2 hover:border-[#c9ad7b] hover:shadow-[0_20px_55px_rgba(23,43,56,0.12)]"
            >

              {/* Doctor Image */}
              <div className="relative h-[330px] overflow-hidden bg-[#e9e5dd]">

                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#172b38]/65 via-transparent to-transparent opacity-70" />

                {/* Specialty Badge */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-[#172b38]/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  <FaStethoscope className="text-[#d5bb8c]" />
                  {member.specialty}
                </div>

                {/* Experience */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-semibold text-white">
                  <FaAward className="text-[#d5bb8c]" />
                  {member.experience}
                </div>

              </div>

              {/* Doctor Details */}
              <div className="p-6">

                <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[#b99b65]">
                  {member.role}
                </p>

                <h3 className="text-2xl font-bold text-[#172b38] transition duration-300 group-hover:text-[#a18450]">
                  {member.name}
                </h3>

                <p className="mt-4 min-h-[72px] text-sm leading-7 text-gray-500">
                  {member.description}
                </p>

                {/* Social Links */}
                <div className="mt-6 flex items-center justify-between border-t border-[#eee9e0] pt-5">

                  <div className="flex items-center gap-2">

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ee] text-[#172b38] transition duration-300 hover:bg-[#172b38] hover:text-white"
                    >
                      <FaLinkedinIn size={14} />
                    </a>

                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Twitter`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ee] text-[#172b38] transition duration-300 hover:bg-[#172b38] hover:text-white"
                    >
                      <FaTwitter size={14} />
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ee] text-[#172b38] transition duration-300 hover:bg-[#172b38] hover:text-white"
                    >
                      <FaEnvelope size={14} />
                    </a>

                  </div>

                  <span className="text-xs font-semibold text-[#a18450]">
                    MEDICARE
                  </span>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Premium CTA */}
      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-[#172b38] px-7 py-16 text-center sm:px-12 lg:px-20 lg:py-20">

          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#c9ad7b]/20" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-60 w-60 rounded-full border border-[#c9ad7b]/20" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-[#c9ad7b]/20" />

          <div className="relative z-10 mx-auto max-w-3xl">

            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c9ad7b]/40 bg-white/5 text-2xl text-[#d5bb8c]">
              <FaHeartbeat />
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[#d5bb8c]">
              Grow With Medicare
            </p>

            <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Make a Difference in
              <span className="block mt-2 text-[#d5bb8c]">
                People's Lives
              </span>
            </h3>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-300 sm:text-base">
              Join a team that values medical excellence, professional growth
              and compassionate patient care. We welcome passionate
              healthcare professionals.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#c9ad7b] px-8 py-4 text-sm font-bold text-[#172b38] transition duration-300 hover:bg-white"
              >
                Contact Our Team
                <FaArrowRight />
              </a>

              <a
                href="mailto:careers@medicare.com"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-[#c9ad7b] hover:bg-white/10"
              >
                Career Opportunities
              </a>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Team;
