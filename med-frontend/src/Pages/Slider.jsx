import React, { useRef, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    name: 'Healthcare Services',
    image: "https://img.freepik.com/free-psd/healthcare-medical-service-ads-promotional-web-banner-template-design_84443-10603.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 2,
    name: 'MediDove Clinic',
    image: "https://www.sliderrevolution.com/wp-content/uploads/2021/12/MediDove.jpg"
  },
  {
    id: 3,
    name: 'Advanced Medical Care',
    image: "https://img.pikbest.com/origin/10/14/03/29tpIkbEsTqJ2.jpg!f305cw"
  },
  {
    id: 4,
    name: 'Wellness & Therapy',
    image: "https://cdn.create.vista.com/downloads/5b42e469-bd75-4758-8e2a-0a45731c9ead_640.jpeg"
  },
];

const Slider = () => {
  const sliderRef = useRef();
  const [isPaused, setIsPaused] = useState(false);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: 'smooth'
    });
    setIsPaused(true);
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth'
    });
    setIsPaused(true);
  };

  useEffect(() => {
    if (!sliderRef.current) return;

    const autoScroll = setInterval(() => {
      if (!isPaused) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    }, 3000);

    if (isPaused) {
      const resumeTimeout = setTimeout(() => setIsPaused(false), 5000);
      return () => {
        clearInterval(autoScroll);
        clearTimeout(resumeTimeout);
      };
    }

    return () => clearInterval(autoScroll);
  }, [isPaused]);

  return (
    <div className="relative w-full font-[Arial]">

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {slides.map(slide => (
          <div
            key={slide.id}
            className="snap-start flex-shrink-0 w-full sm:w-full md:w-full h-64 md:h-96 relative flex items-center justify-center"
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold text-white bg-black bg-opacity-40 text-center px-4">
              {slide.name}
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-100 transition"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-100 transition"
      >
        <FaArrowRight size={20} />
      </button>

    </div>
  );
};

export default Slider;