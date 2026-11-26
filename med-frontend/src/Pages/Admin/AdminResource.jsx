
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaTrash, FaSync } from 'react-icons/fa';

const API = 'http://localhost:8000/api';

const resources = {
  products: {
    title: 'All Products',
    endpoint: '/products',
    columns: ['name', 'category', 'price', 'stock'],
  },
  orders: {
    title: 'Orders Management',
    endpoint: '/orders',
    columns: ['_id', 'totalAmount', 'orderStatus', 'paymentStatus'],
  },
  users: {
    title: 'Users Management',
    endpoint: '/users',
    columns: ['name', 'email'],
  },
  doctors: {
    title: 'Doctors Management',
    endpoint: '/doctors',
    columns: ['name', 'specialization', 'email'],
  },
  appointments: {
    title: 'Appointments Management',
    endpoint: '/appointments',
    columns: ['name', 'email', 'date', 'status'],
  },
  reviews: {
    title: 'Reviews Management',
    endpoint: '/reviews',
    columns: ['name', 'rating', 'comment'],
  },
  messages: {
    title: 'Messages Management',
    endpoint: '/contact',
    columns: ['name', 'email', 'message'],
  },
};

const AdminResource = ({ type }) => {
  const config = resources[type];
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getItems = (response) => {
    const data = response.data;
    if (Array.isArray(data)) return data;

    return (
      data.data ||
      data.products ||
      data.orders ||
      data.users ||
      data.doctors ||
      data.appointments ||
      data.reviews ||
      data.messages ||
      []
    );
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API}${config.endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(getItems(response));
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Data load nahi ho saka. Backend API check karein.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleDelete = async (id) => {
    if (!window.confirm('Kya aap is record ko delete karna chahte hain?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.delete(`${API}${config.endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems((previous) =>
        previous.filter((item) => item._id !== id)
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Delete nahi ho saka. Backend route check karein.'
      );
    }
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  if (!config) return <p>Invalid page.</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172b38]">
            {config.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your {type} from here.
          </p>
        </div>

        <button
          onClick={fetchItems}
          className="flex items-center gap-2 rounded-lg bg-[#172b38] px-4 py-3 text-sm font-semibold text-white"
        >
          <FaSync /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3">
        <FaSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${type}...`}
          className="w-full outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        {loading ? (
          <p className="p-10 text-center text-gray-500">Loading...</p>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchItems}
              className="mt-4 rounded-lg bg-[#172b38] px-5 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="p-10 text-center text-gray-500">
            No {type} found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-[#172b38] text-white">
                <tr>
                  {config.columns.map((column) => (
                    <th key={column} className="px-5 py-4 text-sm capitalize">
                      {column.replace('_', ' ')}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-sm">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {config.columns.map((column) => (
                      <td
                        key={column}
                        className="max-w-[220px] truncate px-5 py-4 text-sm text-gray-600"
                      >
                        {column === '_id'
                          ? `#${String(item[column] || '').slice(-7)}`
                          : item[column] instanceof Date
                            ? item[column].toLocaleDateString()
                            : String(item[column] ?? 'N/A')}
                      </td>
                    ))}

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-lg bg-red-50 p-3 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500">
        Total {type}: {filteredItems.length}
      </p>
    </div>
  );
};

export default AdminResource;
