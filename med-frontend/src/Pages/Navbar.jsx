
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Login status update after navigation
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  }, [location]);

  const menuItems = [
    { id: 1, label: "Home", href: "/home" },
    { id: 2, label: "Services", href: "/services" },
    { id: 3, label: "Products", href: "/products" },
    { id: 4, label: "Doctors", href: "/doctors" },
    { id: 5, label: "Contact", href: "/contact" },
  ];

  const linkStyle = ({ isActive }) =>
    `relative py-2 text-[11px] font-semibold uppercase tracking-[1.5px] transition-colors duration-300 ${
      isActive
        ? "text-[#a88b5b]"
        : "text-[#4c555a] hover:text-[#a88b5b]"
    }`;

  const closeMobileMenu = () => setMobileOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setIsLoggedIn(false);
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50 font-[Arial] border-b border-[#eae6de] shadow-[0_3px_15px_rgba(23,40,50,0.04)]">

      {/* Top Information Bar */}
      <div className="hidden md:block bg-[#172832]">
        <div className="max-w-7xl mx-auto px-8 py-2.5 flex items-center justify-between">
          <p className="text-[9px] text-gray-300 uppercase tracking-[2px]">
            Your Health, Our Priority
          </p>

          <p className="text-[9px] text-[#c5a675] uppercase tracking-[2px]">
            Quality Healthcare & Wellness
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-[78px] md:h-[88px] flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-11 h-11 bg-[#172832] flex items-center justify-center relative">
              <span className="text-[#c5a675] text-2xl font-semibold">
                M
              </span>
              <span className="absolute bottom-1 right-1 w-2 h-2 bg-[#c5a675]" />
            </div>

            <div>
              <h1 className="text-xl md:text-[23px] font-bold tracking-[1px] text-[#172832] leading-none">
                MediCare
              </h1>
              <p className="text-[8px] text-[#a88b5b] uppercase tracking-[3px] mt-2">
                Health & Wellness
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.href} className={linkStyle}>
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-[#c5a675] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-11 h-11 text-[#172832] hover:text-[#a88b5b] transition-colors"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart className="text-xl" />

              {cartCount > 0 && (
                <span className="absolute -top-1 right-0 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-[#c5a675] text-[#172832] text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-3 text-[10px] uppercase tracking-[1.5px] font-semibold text-[#172832] border border-[#ded9cf] hover:border-[#a88b5b] hover:text-[#a88b5b] transition-all duration-300"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-3 text-[10px] uppercase tracking-[1.5px] font-semibold bg-[#172832] text-white hover:bg-[#a88b5b] transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="px-5 py-3 text-[10px] uppercase tracking-[1.5px] font-semibold text-[#172832] border border-[#ded9cf] hover:border-[#a88b5b] hover:text-[#a88b5b] transition-all duration-300"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-3 text-[10px] uppercase tracking-[1.5px] font-semibold bg-[#172832] text-white hover:bg-[#a88b5b] transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}

            <Link
              to="/book-appointment"
              className="flex items-center gap-3 px-5 py-3 text-[10px] uppercase tracking-[1.3px] font-semibold bg-[#c5a675] text-[#172832] hover:bg-[#b18e5a] transition-all duration-300"
            >
              <FaCalendarCheck className="text-sm" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="relative text-[#172832]"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart className="text-xl" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-[#c5a675] text-[#172832] text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-11 h-11 flex items-center justify-center border border-[#eae6de] text-[#172832] hover:bg-[#172832] hover:text-white transition-all duration-300"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden bg-white border-t border-[#eae6de] transition-all duration-300 ${
          mobileOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <div className="px-5 sm:px-8 py-5">

          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <NavLink
                key={item.id}
                to={item.href}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between py-4 border-b border-[#eeeae3] text-[11px] uppercase tracking-[1.7px] font-semibold transition-colors ${
                    isActive
                      ? "text-[#a88b5b]"
                      : "text-[#35434b] hover:text-[#a88b5b]"
                  }`
                }
              >
                {item.label}
                <span className="text-[#c5a675] text-xs">
                  0{index + 1}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Account Buttons */}
          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="text-center py-3 border border-[#ded9cf] text-[#172832] text-[10px] uppercase tracking-[1.5px] font-semibold"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="text-center py-3 bg-[#172832] text-white text-[10px] uppercase tracking-[1.5px] font-semibold"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="text-center py-3 border border-[#ded9cf] text-[#172832] text-[10px] uppercase tracking-[1.5px] font-semibold"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-center py-3 bg-[#172832] text-white text-[10px] uppercase tracking-[1.5px] font-semibold"
              >
                Logout
              </button>
            </div>
          )}

          <Link
            to="/book-appointment"
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-3 mt-3 py-4 bg-[#c5a675] text-[#172832] text-[10px] uppercase tracking-[1.5px] font-bold"
          >
            <FaCalendarCheck />
            Book Appointment
          </Link>

          <p className="text-center text-[9px] text-[#a39c90] uppercase tracking-[2px] mt-6">
            MediCare • Health & Wellness
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
