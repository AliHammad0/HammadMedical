
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBox,
  FaShoppingBag,
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaStar,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaClinicMedical
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Products', path: '/admin/products', icon: FaBox },
    { name: 'Add Product', path: '/admin/products/create', icon: FaShoppingBag },
    { name: 'Orders', path: '/admin/orders', icon: FaShoppingBag },
    { name: 'Users', path: '/admin/users', icon: FaUsers },
    { name: 'Doctors', path: '/admin/doctors', icon: FaUserMd },
    { name: 'Appointments', path: '/admin/appointments', icon: FaCalendarCheck },
    { name: 'Reviews', path: '/admin/reviews', icon: FaStar },
    { name: 'Messages', path: '/admin/messages', icon: FaEnvelope },
    { name: 'Settings', path: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-[Arial]">

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#172b38] text-white transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <FaClinicMedical className="text-3xl text-[#d8bd91]" />
            <div>
              <h2 className="text-xl font-bold">MediCare</h2>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl lg:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#d8bd91] text-[#172b38]'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="text-lg" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-red-500/20 hover:text-white"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:ml-72">

        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 shadow-sm sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl text-[#172b38] lg:hidden"
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>

            <div>
              <h1 className="text-lg font-bold text-[#172b38] sm:text-xl">
                Admin Panel
              </h1>
              <p className="hidden text-xs text-gray-500 sm:block">
                Manage your medical website
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#172b38] font-bold text-[#d8bd91]">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#172b38]">Administrator</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
