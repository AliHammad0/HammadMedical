
import React, { useState } from 'react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    dosage: '',
    price: '',
    expiryDate: '',
    stock: '',
    prescriptionRequired: false,
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add product');
      }

      setMessage('Product added successfully!');

      setFormData({
        name: '',
        brand: '',
        category: '',
        description: '',
        dosage: '',
        price: '',
        expiryDate: '',
        stock: '',
        prescriptionRequired: false,
        image: ''
      });

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-[Arial]">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Add New Product
          </h1>
          <p className="text-gray-500 mt-2">
            Enter product details to add a new medicine.
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg text-black">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black bg-white"
              >
                <option value="">Select Category</option>
                <option value="Medicines">Medicines</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Supplements">Supplements</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Medical Equipment">Medical Equipment</option>
              </select>
            </div>

            {/* Dosage */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Dosage
              </label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="e.g. 500mg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0.01"
                step="0.01"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Available quantity"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Product Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black resize-none"
            />
          </div>

          {/* Prescription */}
          <div className="mt-5 flex items-center gap-3">
            <input
              type="checkbox"
              name="prescriptionRequired"
              checked={formData.prescriptionRequired}
              onChange={handleChange}
              className="w-4 h-4 accent-black"
            />
            <label className="text-sm text-gray-700">
              Prescription Required
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
