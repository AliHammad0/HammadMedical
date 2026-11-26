
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaSync,
  FaShoppingBag,
  FaEye,
  FaTimes,
} from "react-icons/fa";

const API_URL = "http://localhost:8000/api/orders";

const statuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusChanges, setStatusChanges] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch All Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, getConfig());

      const fetchedOrders =
        response.data.orders || response.data.data || [];

      setOrders(fetchedOrders);
    } catch (err) {
      setError(
        err.response?.data?.message || "Orders load nahi ho sakay."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Selected Status
  const handleStatusChange = (orderId, status) => {
    setStatusChanges((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  // Save Status in Database
  const updateStatus = async (order) => {
    const newStatus =
      statusChanges[order._id] || order.orderStatus;

    if (newStatus === order.orderStatus) {
      setMessage("Order status mein koi change nahi hua.");
      return;
    }

    try {
      setUpdatingId(order._id);
      setError("");
      setMessage("");

      const response = await axios.put(
        `${API_URL}/status/${order._id}`,
        { orderStatus: newStatus },
        getConfig()
      );

      const updatedOrder = response.data.order;

      setOrders((prev) =>
        prev.map((item) =>
          item._id === order._id
            ? { ...item, ...updatedOrder }
            : item
        )
      );

      setStatusChanges((prev) => {
        const updated = { ...prev };
        delete updated[order._id];
        return updated;
      });

      if (selectedOrder?._id === order._id) {
        setSelectedOrder((prev) => ({
          ...prev,
          ...updatedOrder,
        }));
      }

      setMessage("Order status successfully update ho gaya.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Order status update nahi ho saka."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Search Orders
  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    return (
      order._id?.toLowerCase().includes(searchText) ||
      order.user?.name?.toLowerCase().includes(searchText) ||
      order.user?.email?.toLowerCase().includes(searchText) ||
      order.orderStatus?.toLowerCase().includes(searchText)
    );
  });

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-purple-100 text-purple-700";
      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-[Arial]">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage customer orders and update their status.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
          Refresh Orders
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-5 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
          {message}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold mt-2">
                {totalOrders}
              </h2>
            </div>
            <FaShoppingBag className="text-3xl text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Delivered Orders</p>
              <h2 className="text-3xl font-bold mt-2">
                {deliveredOrders}
              </h2>
            </div>
            <FaShoppingBag className="text-3xl text-green-500" />
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by order ID, customer, email or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold">
            All Orders ({filteredOrders.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Update Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.map((order) => {
                  const currentStatus =
                    statusChanges[order._id] ||
                    order.orderStatus ||
                    "Pending";

                  return (
                    <tr key={order._id} className="hover:bg-gray-50">

                      <td className="px-5 py-4 font-medium">
                        #{order._id.slice(-7).toUpperCase()}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {order.user?.name ||
                            order.shippingAddress?.fullName ||
                            "Customer"}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {order.user?.email || "N/A"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        Rs. {Number(order.totalAmount || 0).toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        {order.paymentMethod || "COD"}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus || "Pending"}
                        </span>
                      </td>

                      <td className="px-5 py-4 min-w-[230px]">
                        <div className="flex flex-col gap-2">

                          <select
                            value={currentStatus}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => updateStatus(order)}
                            disabled={
                              updatingId === order._id ||
                              currentStatus === order.orderStatus
                            }
                            className="bg-black text-white rounded-lg px-3 py-2 text-xs font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            {updatingId === order._id
                              ? "Updating..."
                              : "Update Status"}
                          </button>

                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          <FaEye />
                          View
                        </button>
                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Customer</p>
                  <p className="font-semibold">
                    {selectedOrder.user?.name ||
                      selectedOrder.shippingAddress?.fullName ||
                      "Customer"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold">
                    {selectedOrder.user?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <p className="font-semibold">
                    Rs. {Number(selectedOrder.totalAmount || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Payment Method</p>
                  <p className="font-semibold">
                    {selectedOrder.paymentMethod || "COD"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Payment Status</p>
                  <p className="font-semibold">
                    {selectedOrder.paymentStatus || "Pending"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Order Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.orderStatus)}`}>
                    {selectedOrder.orderStatus || "Pending"}
                  </span>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">Shipping Address</h3>
                <p>{selectedOrder.shippingAddress?.fullName}</p>
                <p>{selectedOrder.shippingAddress?.phone}</p>
                <p>{selectedOrder.shippingAddress?.address}</p>
                <p>
                  {selectedOrder.shippingAddress?.city}{" "}
                  {selectedOrder.shippingAddress?.postalCode}
                </p>
              </div>

              {/* Products */}
              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">Order Items</h3>

                <div className="space-y-3">
                  {(selectedOrder.items || []).map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name || "Product"}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}

                      <div className="flex-1">
                        <p className="font-semibold">
                          {item.name || item.product?.name || "Product"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        Rs. {Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-5 border-t flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;
