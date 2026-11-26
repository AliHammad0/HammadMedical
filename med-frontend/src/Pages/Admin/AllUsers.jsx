
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaSearch,
  FaSync,
  FaUsers,
  FaEnvelope,
  FaUser,
} from 'react-icons/fa';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const response = await axios.get(
        'http://localhost:8000/api/auth',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.users || []);
    } catch (err) {
      console.error('Users fetch error:', err);

      setError(
        err.response?.data?.message ||
        'Users load nahi ho sakay.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8f8f6] p-4 font-[Arial] sm:p-6">

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#17233b]">
            All Users
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage registered users
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#17233b] px-4 py-2.5 text-white hover:bg-[#263956]"
        >
          <FaSync />
          Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="mt-2 text-2xl font-bold text-[#17233b]">
                {users.length}
              </h2>
            </div>

            <FaUsers className="text-2xl text-[#17233b]" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Search Results</p>
              <h2 className="mt-2 text-2xl font-bold text-[#17233b]">
                {filteredUsers.length}
              </h2>
            </div>

            <FaUser className="text-2xl text-[#17233b]" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-lg font-bold text-[#17233b]">
            Users List
          </h2>

          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#17233b]"
            />
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading users...
          </p>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No users found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b bg-[#f8f8f6] text-sm text-gray-600">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1eee7] text-[#17233b]">
                          <FaUser />
                        </div>

                        <span className="font-medium text-[#17233b]">
                          {user.name || 'No Name'}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        {user.email || 'No Email'}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.isAdmin
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
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

export default AllUsers;
