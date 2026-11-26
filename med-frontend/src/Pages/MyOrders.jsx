
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelLoading, setCancelLoading] = useState("");

  const token = localStorage.getItem("token");

  // Fetch My Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to fetch orders.");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    fetchOrders();
  }, []);

  // Cancel Order
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      setCancelLoading(orderId);

      const response = await fetch(
        `http://localhost:8000/api/orders/cancel/${orderId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to cancel order.");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: "Cancelled" }
            : order
        )
      );

      alert("Order cancelled successfully.");
    } catch (err) {
      alert(err.message);
    } finally {
      setCancelLoading("");
    }
  };

  // Status Styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4] font-[Arial]">
        <p className="text-sm font-semibold tracking-widest text-[#172832]">
          LOADING YOUR ORDERS...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-4 py-12 font-[Arial]">

      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[3px] text-[#a88b5b] mb-3">
            MediCare • Account
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#172832]">
            My Orders
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            View and manage your previous orders.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-5 text-center">
            <p className="text-sm text-red-600 mb-4">
              {error}
            </p>

            {!token && (
              <Link
                to="/login"
                className="inline-block bg-[#172832] px-6 py-3 text-xs uppercase tracking-widest text-white"
              >
                Login
              </Link>
            )}
          </div>
        )}

        {/* Empty Orders */}
        {!error && orders.length === 0 && (
          <div className="bg-white shadow-sm p-10 md:p-16 text-center">

            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#f8f7f4] text-[#c5a675]">
              <FaBoxOpen className="text-3xl" />
            </div>

            <h2 className="text-2xl font-bold text-[#172832] mb-3">
              No Orders Yet
            </h2>

            <p className="text-sm text-gray-500 mb-7">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="inline-block bg-[#172832] px-8 py-4 text-xs font-bold uppercase tracking-[2px] text-white hover:bg-[#a88b5b] transition"
            >
              Explore Products
            </Link>

          </div>
        )}

        {/* Orders List */}
        {!error && orders.length > 0 && (
          <div className="space-y-7">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white border border-[#eeeae3] shadow-sm"
              >

                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-5 md:p-7 border-b border-[#eeeae3]">

                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mb-2">
                      Order ID
                    </p>

                    <p className="text-sm font-bold text-[#172832] break-all">
                      #{order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mb-2">
                      Order Date
                    </p>

                    <p className="flex items-center gap-2 text-sm text-[#172832]">
                      <FaCalendarAlt className="text-[#c5a675]" />
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-PK",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mb-2">
                      Order Status
                    </p>

                    <span
                      className={`inline-block px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                </div>

                {/* Products */}
                <div className="p-5 md:p-7">

                  <h3 className="text-sm font-bold text-[#172832] mb-5">
                    Ordered Products
                  </h3>

                  <div className="space-y-5">

                    {order.items?.map((item, index) => (

                      <div
                        key={item._id || index}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-[#eeeae3] pb-5 last:border-0 last:pb-0"
                      >

                        <div className="w-20 h-20 bg-[#f8f7f4] shrink-0">
                          <img
                            src={
                              item.image ||
                              "https://placehold.co/120x120?text=Medicine"
                            }
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-[#172832]">
                            {item.name}
                          </h4>

                          <p className="text-xs text-gray-500 mt-2">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-bold text-[#a88b5b]">
                          Rs. {(
                            Number(item.price) * item.quantity
                          ).toLocaleString("en-PK")}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Order Footer */}
                <div className="bg-[#fcfaf6] p-5 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      Payment Method:{" "}
                      <span className="font-semibold text-[#172832]">
                        {order.paymentMethod}
                      </span>
                    </p>

                    <p className="text-xs text-gray-500">
                      Payment Status:{" "}
                      <span className="font-semibold text-[#172832]">
                        {order.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    <div className="sm:text-right">
                      <p className="text-[10px] uppercase tracking-[2px] text-gray-400">
                        Total Amount
                      </p>

                      <p className="text-xl font-bold text-[#a88b5b] mt-1">
                        Rs. {Number(order.totalAmount).toLocaleString("en-PK")}
                      </p>
                    </div>

                    {["Pending", "Confirmed", "Processing"].includes(
                      order.orderStatus
                    ) && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancelLoading === order._id}
                        className="flex items-center justify-center gap-2 border border-red-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <FaTimes />
                        {cancelLoading === order._id
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;
