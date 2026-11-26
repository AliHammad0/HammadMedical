
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaBox,
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave,
  FaClock
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get('http://localhost:8000/api/products', { headers }),
          axios.get('http://localhost:8000/api/orders', { headers }),
          axios.get('http://localhost:8000/api/users', { headers })
        ]);

        const products =
          productsRes.data.products || productsRes.data.data || [];

        const orders =
          ordersRes.data.orders || ordersRes.data.data || [];

        const users =
          usersRes.data.users || usersRes.data.data || [];

        const revenue = orders.reduce((total, order) => {
          if (
            ['Paid', 'Completed'].includes(order.paymentStatus)
          ) {
            return total + Number(order.totalAmount || 0);
          }
          return total;
        }, 0);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue
        });

        setRecentOrders(orders.slice(-5).reverse());
      } catch (error) {
        console.error('Dashboard Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: FaBox,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: FaShoppingBag,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'Total Users',
      value: stats.users,
      icon: FaUsers,
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Total Revenue',
      value: `Rs. ${stats.revenue.toLocaleString('en-PK')}`,
      icon: FaMoneyBillWave,
      color: 'bg-amber-100 text-amber-700'
    }
  ];

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-[Arial]">

      <div>
        <h2 className="text-2xl font-bold text-[#172b38]">
          Dashboard Overview
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Welcome to your Medical Admin Dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-2xl font-bold text-[#172b38]">
                    {card.value}
                  </h3>
                </div>

                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}>
                  <Icon className="text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h3 className="text-lg font-bold text-[#172b38]">
              Recent Orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Latest customer orders
            </p>
          </div>
          <FaClock className="text-xl text-[#b99b70]" />
        </div>

        {recentOrders.length === 0 ? (
          <p className="p-10 text-center text-gray-500">
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="text-sm">
                    <td className="px-6 py-4 font-semibold">
                      #{order._id?.slice(-6)}
                    </td>
                    <td className="px-6 py-4">
                      {order.user?.name || order.name || 'Customer'}
                    </td>
                    <td className="px-6 py-4">
                      Rs. {Number(order.totalAmount || 0).toLocaleString('en-PK')}
                    </td>
                    <td className="px-6 py-4">
                      {order.orderStatus || 'Pending'}
                    </td>
                    <td className="px-6 py-4">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString('en-PK')
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
