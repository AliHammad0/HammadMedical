
import React, { useState } from 'react';
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaQuestionCircle,
  FaCalendarCheck,
  FaUserMd,
  FaCreditCard,
  FaCapsules,
  FaPhoneAlt
} from 'react-icons/fa';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    'All',
    'Appointments',
    'Doctors',
    'Payments',
    'Products',
    'General'
  ];

  const faqs = [
    {
      category: 'Appointments',
      question: 'How can I book an appointment?',
      answer: 'You can book an appointment by visiting our Book Appointment page. Fill in your details, select a department, doctor, date and available time, then submit your request.'
    },
    {
      category: 'Appointments',
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can contact our support team to request cancellation or rescheduling. Please provide your appointment details so our team can assist you.'
    },
    {
      category: 'Appointments',
      question: 'Will I receive appointment confirmation?',
      answer: 'Your appointment request will be submitted with Pending status. Our team can contact you to confirm the appointment.'
    },
    {
      category: 'Doctors',
      question: 'How can I find the right doctor?',
      answer: 'Visit our Doctors page to explore doctor profiles, specialties and experience. You can choose a doctor according to your healthcare needs.'
    },
    {
      category: 'Doctors',
      question: 'Can I choose a specific doctor?',
      answer: 'Yes. While booking an appointment, you can select your preferred doctor if that option is available.'
    },
    {
      category: 'Payments',
      question: 'What payment methods are available?',
      answer: 'Available payment methods are displayed during checkout. Please check the payment page for the latest supported options.'
    },
    {
      category: 'Payments',
      question: 'Will I receive an order confirmation?',
      answer: 'After successfully placing an order, you should receive an order confirmation with your order details.'
    },
    {
      category: 'Products',
      question: 'How can I order medical products?',
      answer: 'Visit our Products page, select the product you need, add it to your cart and follow the checkout process.'
    },
    {
      category: 'Products',
      question: 'Can I return or exchange a product?',
      answer: 'Return and exchange eligibility depends on the product and our applicable return policy. Contact our support team for assistance.'
    },
    {
      category: 'General',
      question: 'How can I contact MEDICARE?',
      answer: 'You can reach us through our Contact page, where you can submit your message and find our available contact information.'
    },
    {
      category: 'General',
      question: 'Is MEDICARE an emergency medical service?',
      answer: 'Our website is intended for general healthcare information, appointments and product services. For a medical emergency, contact your local emergency service or visit the nearest emergency department immediately.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;

    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategory = (category) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-[Arial] text-[#172b38]">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#172b38] px-5 py-24 text-center sm:py-28">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border border-[#c9ad7b]/20" />
        <div className="absolute -bottom-36 -right-20 h-96 w-96 rounded-full border border-[#c9ad7b]/20" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9ad7b]/40 px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#c9ad7b]">
            <FaQuestionCircle />
            Help Center
          </span>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
            Frequently Asked
            <span className="block text-[#c9ad7b]">Questions</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Find answers to common questions about our doctors,
            appointments, healthcare products and services.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl items-center rounded-xl border border-white/10 bg-white px-4 py-2 shadow-xl">
            <FaSearch className="shrink-0 text-[#b99b65]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenIndex(null);
              }}
              placeholder="Search your question..."
              className="w-full bg-transparent px-4 py-3 text-sm text-[#172b38] outline-none placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs font-semibold text-[#b99b65]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="mx-auto max-w-6xl px-5 py-20">

        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#b99b65]">
            Information Center
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            How Can We Help You?
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Browse questions by category to find the information you need.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'border-[#172b38] bg-[#172b38] text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#b99b65] hover:text-[#b99b65]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="mx-auto max-w-4xl space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={`${faq.category}-${faq.question}`}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  openIndex === index
                    ? 'border-[#c9ad7b] shadow-lg'
                    : 'border-gray-100 shadow-sm hover:border-[#c9ad7b]/60'
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left sm:px-8"
                >
                  <div>
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[2px] text-[#b99b65]">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-bold leading-6 text-[#172b38] sm:text-base">
                      {faq.question}
                    </h3>
                  </div>

                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                    openIndex === index
                      ? 'bg-[#172b38] text-[#c9ad7b]'
                      : 'bg-[#f8f7f4] text-[#172b38]'
                  }`}>
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="border-t border-gray-100 px-6 py-6 sm:px-8">
                    <p className="text-sm leading-8 text-gray-500">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <FaSearch className="mx-auto text-3xl text-[#b99b65]" />
              <h3 className="mt-5 text-xl font-bold text-[#172b38]">
                No Questions Found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search term or select a different category.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
                className="mt-6 rounded-full bg-[#172b38] px-6 py-3 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </section>

      {/* Contact CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-3xl bg-[#172b38] p-8 text-center sm:p-14 md:flex-row md:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#c9ad7b]">
              Still Need Help?
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Have More Questions?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/60">
              Our team is ready to help you with your questions and guide you
              through our services.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#c9ad7b] px-8 py-4 text-sm font-bold text-[#172b38] transition hover:bg-white"
          >
            <FaPhoneAlt />
            Contact Us
          </a>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
