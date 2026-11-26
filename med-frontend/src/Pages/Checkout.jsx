
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlices";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: localStorage.getItem("name") || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image || "",
          price: Number(item.price),
          quantity: item.quantity || 1,
        })),

        shippingAddress: formData,
        paymentMethod: "COD",
      };

      const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to place order.");
      }

      dispatch(clearCart());

      alert("Your order has been placed successfully!");

      navigate("/my-orders");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-5 font-[Arial]">
        <div className="bg-white p-10 text-center max-w-md w-full shadow-sm">
          <h2 className="text-2xl font-bold text-[#172832] mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Please add some products before checkout.
          </p>

          <Link
            to="/products"
            className="inline-block bg-[#172832] text-white px-7 py-3 text-xs uppercase tracking-widest"
          >
            Shop Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-12 px-5 font-[Arial]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-[#a88b5b] text-xs uppercase tracking-[3px] mb-3">
            MediCare • Secure Checkout
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#172832]">
            Complete Your Order
          </h1>

          <p className="text-gray-500 text-sm mt-3">
            Enter your delivery details to place your order.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >

          {/* Customer Information */}
          <div className="lg:col-span-2 bg-white p-6 md:p-9 shadow-sm">

            <h2 className="text-xl font-bold text-[#172832] mb-7">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#172832] mb-2">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-[#e5e1d9] px-4 py-3 text-sm outline-none focus:border-[#c5a675]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#172832] mb-2">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX"
                  required
                  className="w-full border border-[#e5e1d9] px-4 py-3 text-sm outline-none focus:border-[#c5a675]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#172832] mb-2">
                  Complete Address *
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area..."
                  rows="4"
                  required
                  className="w-full border border-[#e5e1d9] px-4 py-3 text-sm outline-none resize-none focus:border-[#c5a675]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172832] mb-2">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                  className="w-full border border-[#e5e1d9] px-4 py-3 text-sm outline-none focus:border-[#c5a675]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172832] mb-2">
                  Postal Code
                </label>

                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className="w-full border border-[#e5e1d9] px-4 py-3 text-sm outline-none focus:border-[#c5a675]"
                />
              </div>

            </div>

            {/* Payment Method */}
            <div className="mt-9">
              <h2 className="text-xl font-bold text-[#172832] mb-5">
                Payment Method
              </h2>

              <div className="border border-[#c5a675] bg-[#fcfaf6] p-5 flex items-center gap-4">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-[#172832]"
                />

                <div>
                  <p className="text-sm font-bold text-[#172832]">
                    Cash on Delivery (COD)
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Pay when your order arrives.
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-5 text-sm text-red-600 bg-red-50 p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-[#172832] hover:bg-[#a88b5b] text-white py-4 text-xs font-bold uppercase tracking-[2px] transition-all disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 md:p-7 shadow-sm h-fit">

            <h2 className="text-xl font-bold text-[#172832] mb-7">
              Order Summary
            </h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b border-[#eeeae3] pb-5"
                >
                  <div className="w-16 h-16 bg-[#f8f7f4] shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#172832] truncate">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Quantity: {item.quantity || 1}
                    </p>

                    <p className="text-sm font-bold text-[#a88b5b] mt-1">
                      Rs. {(
                        Number(item.price) * (item.quantity || 1)
                      ).toLocaleString("en-PK")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-7">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {totalAmount.toLocaleString("en-PK")}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-700">Free</span>
              </div>

              <div className="border-t border-[#eae6de] pt-5 flex justify-between items-center">
                <span className="font-bold text-[#172832]">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-[#a88b5b]">
                  Rs. {totalAmount.toLocaleString("en-PK")}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-7 leading-5">
              Your order will be processed after confirmation.
            </p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
