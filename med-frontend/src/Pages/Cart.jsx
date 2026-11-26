
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlices";

import {
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.cartItems || []
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-4 py-12 font-[Arial]">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[3px] text-[#a88b5b]">
            MediCare • Your Selection
          </p>

          <h1 className="text-3xl font-bold text-[#172832] md:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Review your selected healthcare products.
          </p>
        </div>

        {cartItems.length === 0 ? (

          /* Empty Cart */
          <div className="bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-[#f8f7f4] text-[#c5a675]">
              <FaShoppingCart className="text-3xl" />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-[#172832]">
              Your Cart is Empty
            </h2>

            <p className="mb-7 text-sm text-gray-500">
              You haven't added any products to your cart yet.
            </p>

            <Link
              to="/products"
              className="inline-block bg-[#172832] px-8 py-4 text-xs font-bold uppercase tracking-[2px] text-white transition hover:bg-[#a88b5b]"
            >
              Explore Products
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* Cart Products */}
            <div className="space-y-5 lg:col-span-2">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="flex flex-col gap-5 border border-[#eeeae3] bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >

                  {/* Product Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-[#f8f7f4]">
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/120x120?text=Medicine"
                      }
                      alt={item.name}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">

                    <h3 className="text-lg font-bold text-[#172832]">
                      {item.name}
                    </h3>

                    {item.brand && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.brand}
                      </p>
                    )}

                    <p className="mt-3 text-lg font-bold text-[#a88b5b]">
                      Rs. {Number(item.price).toLocaleString("en-PK")}
                    </p>

                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(decreaseQuantity(item._id))
                      }
                      disabled={item.quantity <= 1}
                      className="flex h-9 w-9 items-center justify-center border border-[#ded9cf] text-[#172832] transition hover:bg-[#172832] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      -
                    </button>

                    <span className="min-w-6 text-center font-bold text-[#172832]">
                      {item.quantity || 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(increaseQuantity(item._id))
                      }
                      className="flex h-9 w-9 items-center justify-center border border-[#ded9cf] text-[#172832] transition hover:bg-[#172832] hover:text-white"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(removeFromCart(item._id))
                    }
                    className="flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-800"
                  >
                    <FaTrash className="text-xs" />
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Order Summary */}
            <div className="h-fit border border-[#eeeae3] bg-white p-6 shadow-sm">

              <h2 className="mb-7 text-xl font-bold text-[#172832]">
                Order Summary
              </h2>

              <div className="mb-4 flex justify-between text-sm text-gray-600">
                <span>Total Items</span>
                <span className="font-semibold text-[#172832]">
                  {totalItems}
                </span>
              </div>

              <div className="mb-5 flex justify-between border-b border-[#eeeae3] pb-5 text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-[#172832]">
                  Rs. {totalPrice.toLocaleString("en-PK")}
                </span>
              </div>

              <div className="mb-7 flex justify-between">
                <span className="font-bold text-[#172832]">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-[#a88b5b]">
                  Rs. {totalPrice.toLocaleString("en-PK")}
                </span>
              </div>

              {/* Checkout */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-[#172832] py-4 text-xs font-bold uppercase tracking-[2px] text-white transition hover:bg-[#a88b5b]"
              >
                Proceed to Checkout
              </button>

              {/* Clear Cart */}
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="mt-3 w-full border border-red-200 py-4 text-xs font-bold uppercase tracking-[2px] text-red-600 transition hover:bg-red-50"
              >
                Clear Cart
              </button>

              <p className="mt-6 text-center text-[10px] leading-5 text-gray-400">
                Thank you for choosing MediCare Health & Wellness.
              </p>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default Cart;
