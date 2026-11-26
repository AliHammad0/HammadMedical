
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Navbar from './Pages/Navbar';
import Team from './Pages/Team';
import Contact from './Pages/Contact';
import Signup from './Pages/Signup';
import Services from './components/Services';
import Footer from './components/Footer';

import Productlist from './Pages/Product';
import PaymentPage from './Pages/PaymentPage';
import ProductDetails from './Pages/SinglePage';
import Login from './Pages/Login';
import CreateProduct from './Pages/CreateProduct';
import BookAppointment from './Pages/BookAppointment';
import FAQ from './Pages/FAQ.JSX';
import Terms from './Pages/Terms';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import MyOrders from './Pages/MyOrders';

// Admin Pages
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AllProducts from './Pages/Admin/AllProducts';
import Orders from './Pages/Admin/Orders';
import AllUsers from './Pages/Admin/AllUsers';
import AllDoctors from './Pages/Admin/AllDoctors';
import Appointments from './Pages/Admin/Appointments';
import Reviews from './Pages/Admin/Reviews';
import Messages from './Pages/Admin/Messages';
import Settings from './Pages/Admin/Settings';

// Home Page
const Home = () => {
  return (
    <>
      <Services />
      <Team />
      <Productlist />
      <BookAppointment />
      <Contact />
    </>
  );
};

// Website Layout
const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f7f4] font-[Arial]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

// Admin Protected Route
const AdminProtectedRoute = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsAdmin(false);
          return;
        }

        const response = await axios.get(
          'http://localhost:8000/api/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsAdmin(response.data.user?.isAdmin === true);
      } catch (error) {
        console.error('Admin verification failed:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4] font-[Arial]">
        <p className="text-lg font-medium text-[#17233b]">
          Verifying admin access...
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <AdminLayout />;
};

// 404 Page
const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-center">
      <div>
        <h1 className="text-6xl font-bold text-[#172b38]">404</h1>
        <p className="mt-3 text-gray-500">Page Not Found</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<AdminDashboard />} />

          <Route path="products" element={<AllProducts />} />

          <Route
            path="products/create"
            element={<CreateProduct />}
          />

          <Route path="orders" element={<Orders />} />

          <Route path="users" element={<AllUsers />} />

          <Route path="doctors" element={<AllDoctors />} />

          <Route path="appointments" element={<Appointments />} />

          <Route path="reviews" element={<Reviews />} />

          <Route path="messages" element={<Messages />} />

          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Normal Website Routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Team />} />

          <Route path="/products" element={<Productlist />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route
            path="/book-appointment"
            element={<BookAppointment />}
          />

          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/create" element={<CreateProduct />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
