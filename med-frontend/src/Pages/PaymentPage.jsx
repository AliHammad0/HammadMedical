import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* ------------ Detect Mobile ------------ */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};

/* ------------ 3D Tilt (Desktop Only) ------------ */
const TiltCard = ({ children }) => {
  const isMobile = useIsMobile();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [18, -18]);
  const rotateY = useTransform(x, [-150, 150], [-18, 18]);

  const handleMouseMove = (e) => {
    if (isMobile) return;

    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        isMobile
          ? {}
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      className="transition-transform duration-200"
    >
      {children}
    </motion.div>
  );
};

/* ------------ Payment Page ------------ */
const PaymentPage = () => {
  const [method, setMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      method === "cod"
        ? "Order Placed with Cash on Delivery 🚚"
        : "Payment Successful 💳"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 px-3 sm:px-6 py-6 sm:py-12">
      <TiltCard>
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col lg:grid lg:grid-cols-3 overflow-hidden">
          
          {/* ORDER SUMMARY */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 sm:p-10 lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Order</h2>

            <div className="space-y-4 text-base sm:text-lg">
              <div className="flex justify-between">
                <span>Products</span>
                <span>$120</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$10</span>
              </div>
              <div className="border-t border-indigo-300 pt-4 flex justify-between font-semibold text-lg sm:text-xl">
                <span>Total</span>
                <span>$130</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm opacity-80 mt-6">
              🔒 Secure checkout with encrypted gateway
            </p>
          </div>

          {/* PAYMENT SECTION */}
          <div className="p-6 sm:p-10 lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Payment Method
            </h2>

            {/* Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["card", "cod"].map((type) => (
                <motion.div
                  key={type}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMethod(type)}
                  className={`cursor-pointer border-2 rounded-2xl p-5 shadow-md transition ${
                    method === type
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {type === "card"
                      ? "💳 Card Payment"
                      : "🚚 Cash on Delivery"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {type === "card"
                      ? "Pay with your debit/credit card."
                      : "Pay cash at your doorstep."}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {method === "card" && (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Card Holder Name"
                    className="w-full p-4 text-base border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    className="w-full p-4 text-base border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="p-4 text-base border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      type="password"
                      required
                      placeholder="CVV"
                      className="p-4 text-base border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </>
              )}

              {method === "cod" && (
                <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-xl text-sm">
                  You will pay in cash when your order arrives.
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
              >
                {method === "cod" ? "Place Order" : "Pay Now"}
              </motion.button>
            </form>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default PaymentPage;
