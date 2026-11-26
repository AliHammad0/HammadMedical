
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync
} from 'react-icons/fa';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API = 'http://localhost:8000/api/products';

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data =
        response.data.products ||
        response.data.data ||
        response.data;

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || 'Products load nahi ho sake.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Kya aap ye product delete karna chahte hain?'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts((previous) =>
        previous.filter((product) => product._id !== id)
      );

      alert('Product deleted successfully!');
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || 'Product delete nahi ho saka.'
      );
    }
  };

  // Search Products
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6 font-[Arial]">

      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172b38]">
            All Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your medical products.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 rounded-xl bg-[#172b38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#263f50]"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* Search and Refresh */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search by name, brand or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <button
          onClick={fetchProducts}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#172b38] hover:bg-gray-50"
        >
          <FaSync />
          Refresh
        </button>
      </div>

      {/* Products Count */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">
          Total Products
        </p>
        <h3 className="mt-1 text-2xl font-bold text-[#172b38]">
          {filteredProducts.length}
        </h3>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading products...
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-red-600">{error}</p>

            <button
              onClick={fetchProducts}
              className="mt-4 rounded-lg bg-[#172b38] px-5 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-semibold text-gray-600">
              No products found.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Add a new product or change your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">

              <thead className="bg-[#172b38] text-white">
                <tr>
                  <th className="px-5 py-4 text-sm">Product</th>
                  <th className="px-5 py-4 text-sm">Brand</th>
                  <th className="px-5 py-4 text-sm">Category</th>
                  <th className="px-5 py-4 text-sm">Price</th>
                  <th className="px-5 py-4 text-sm">Stock</th>
                  <th className="px-5 py-4 text-sm">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Product Image and Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || 'https://placehold.co/100x100?text=Medicine'}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl border border-gray-100 object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://placehold.co/100x100?text=Medicine';
                          }}
                        />

                        <div>
                          <p className="font-semibold text-[#172b38]">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            ID: {product._id?.slice(-7)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.brand || 'N/A'}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {product.category || 'N/A'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-sm font-semibold text-[#172b38]">
                      Rs. {Number(product.price || 0).toLocaleString('en-PK')}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          Number(product.stock) > 10
                            ? 'bg-green-50 text-green-700'
                            : Number(product.stock) > 0
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {product.stock ?? 0} Units
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="rounded-lg bg-blue-50 p-3 text-blue-600 transition hover:bg-blue-100"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="rounded-lg bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>

                      </div>
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

export default AllProducts;
