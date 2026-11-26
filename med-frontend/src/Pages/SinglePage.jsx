
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/slices/cartSlices";

import {
  FaShoppingBag,
  FaCreditCard,
  FaShieldAlt,
  FaPrescriptionBottleAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaExclamationCircle,
  FaBoxOpen,
  FaTruck,
  FaUndoAlt,
  FaCheck,
} from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setQuantity(1);
    setAddedToCart(false);
  }, [id]);

  const productImages = product?.image
    ? [product.image]
    : [];

  const increaseQuantity = () => {
    if (quantity >= Number(product?.stock || 0)) return;

    setQuantity((prev) => prev + 1);
    setAddedToCart(false);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
    setAddedToCart(false);
  };

  // Add product to Redux cart without navigating
  const handleAddToCart = () => {
    if (!product || Number(product.stock) <= 0) return;

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    setAddedToCart(true);
  };

  // Buy Now: Add product and open Checkout
  const handleBuyNow = () => {
    if (!product || Number(product.stock) <= 0) return;

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    navigate("/checkout");
  };

  const formatPrice = (price) => {
    return `PKR ${Number(price || 0).toLocaleString("en-PK")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] px-5 py-20 font-[Arial]">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-gray-200" />
          <div className="space-y-6">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-14 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-14 animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4] px-5 font-[Arial]">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl text-red-500">
            <FaExclamationCircle />
          </div>

          <h2 className="mt-7 text-2xl font-bold text-[#172b38]">
            Product Not Found
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            {error || "This product is currently unavailable."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate(-1)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-4 text-sm font-semibold text-[#172b38] transition hover:bg-gray-50"
            >
              <FaArrowLeft />
              Go Back
            </button>

            <button
              onClick={() => navigate("/products")}
              className="flex-1 rounded-xl bg-[#172b38] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#244354]"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isInStock = Number(product.stock) > 0;

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          (1 - product.price / product.originalPrice) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-[Arial] text-[#172b38]">

      {/* Breadcrumb */}
      <div className="border-b border-gray-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 text-xs sm:text-sm">
          <button
            onClick={() => navigate("/products")}
            className="text-gray-500 transition hover:text-[#b99b65]"
          >
            Products
          </button>

          <span className="text-[#c9ad7b]">/</span>

          <span className="text-gray-500">
            {product.category}
          </span>

          <span className="text-[#c9ad7b]">/</span>

          <span className="max-w-[150px] truncate font-semibold text-[#172b38] sm:max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Product Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-10">
              {discount > 0 && (
                <span className="absolute left-7 top-7 z-10 rounded-full bg-[#172b38] px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-[#c9ad7b]">
                  {discount}% OFF
                </span>
              )}

              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#f8f7f4]">
                {productImages.length > 0 ? (
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-contain p-5 transition duration-700 hover:scale-105 sm:p-10"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-300">
                    <FaBoxOpen className="text-7xl" />
                    <span className="text-sm">
                      No product image available
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="mt-5 flex gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-white p-2 transition ${
                      selectedImage === index
                        ? "border-[#b99b65] shadow-md"
                        : "border-gray-200 hover:border-[#c9ad7b]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#c9ad7b]/30 bg-white p-5">
              <FaShieldAlt className="shrink-0 text-xl text-[#b99b65]" />
              <p className="text-xs leading-6 text-gray-500">
                Please review the product details and usage instructions
                before purchasing.
              </p>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:pt-5">

            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-[#b99b65]">
              <span className="h-px w-8 bg-[#b99b65]" />
              MEDICARE COLLECTION
            </span>

            {product.category && (
              <div className="mt-7">
                <span className="rounded-full border border-[#c9ad7b]/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#9c8051]">
                  {product.category}
                </span>
              </div>
            )}

            <h1 className="mt-6 text-3xl font-bold leading-tight text-[#172b38] sm:text-5xl">
              {product.name}
            </h1>

            {product.brand && (
              <p className="mt-4 text-sm font-medium text-gray-500">
                Brand:{" "}
                <span className="text-[#172b38]">
                  {product.brand}
                </span>
              </p>
            )}

            <div className="my-8 h-px bg-gray-200" />

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold tracking-tight text-[#172b38] sm:text-4xl">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="rounded-full bg-[#edf4ee] px-3 py-2 text-xs font-bold text-green-700">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#172b38]">
                Product Description
              </h3>

              <p className="mt-4 text-sm leading-8 text-gray-500">
                {product.description || "No description available for this product."}
              </p>
            </div>

            {/* Product Details */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[2px]">
                Product Information
              </h3>

              <div className="space-y-4">

                {product.brand && (
                  <div className="flex justify-between gap-4 border-b border-gray-100 pb-4 text-sm">
                    <span className="text-gray-500">Brand</span>
                    <span className="text-right font-semibold text-[#172b38]">
                      {product.brand}
                    </span>
                  </div>
                )}

                {product.dosage && (
                  <div className="flex justify-between gap-4 border-b border-gray-100 pb-4 text-sm">
                    <span className="flex items-center gap-2 text-gray-500">
                      <FaPrescriptionBottleAlt className="text-[#b99b65]" />
                      Dosage
                    </span>
                    <span className="text-right font-semibold text-[#172b38]">
                      {product.dosage}
                    </span>
                  </div>
                )}

                {product.expiryDate && (
                  <div className="flex justify-between gap-4 border-b border-gray-100 pb-4 text-sm">
                    <span className="flex items-center gap-2 text-gray-500">
                      <FaCalendarAlt className="text-[#b99b65]" />
                      Expiry Date
                    </span>
                    <span className="text-right font-semibold text-[#172b38]">
                      {new Date(product.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Prescription</span>
                  <span className={`font-semibold ${
                    product.prescriptionRequired
                      ? "text-red-600"
                      : "text-green-700"
                  }`}>
                    {product.prescriptionRequired
                      ? "Required"
                      : "Not Required"}
                  </span>
                </div>

              </div>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${
                isInStock ? "bg-green-500" : "bg-red-500"
              }`} />

              <span className={`text-sm font-semibold ${
                isInStock ? "text-green-700" : "text-red-600"
              }`}>
                {isInStock
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="mb-4 text-xs font-bold uppercase tracking-[2px]">
                Select Quantity
              </p>

              <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-12 w-12 items-center justify-center text-[#172b38] transition hover:bg-[#f8f7f4] disabled:opacity-40"
                >
                  <FaMinus size={11} />
                </button>

                <span className="flex h-12 min-w-14 items-center justify-center border-x border-gray-200 text-sm font-bold">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  disabled={!isInStock || quantity >= Number(product.stock)}
                  className="flex h-12 w-12 items-center justify-center text-[#172b38] transition hover:bg-[#f8f7f4] disabled:opacity-40"
                >
                  <FaPlus size={11} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className={`flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-sm font-bold uppercase tracking-wider text-white transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                  addedToCart
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-[#172b38] hover:bg-[#244354]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <FaCheck />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <FaShoppingBag className="text-[#c9ad7b]" />
                    Add To Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!isInStock}
                className="flex items-center justify-center gap-3 rounded-xl border border-[#c9ad7b] bg-[#c9ad7b] px-6 py-5 text-sm font-bold uppercase tracking-wider text-[#172b38] transition duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaCreditCard />
                Buy Now
              </button>

            </div>

            {addedToCart && (
              <p className="mt-4 text-sm font-medium text-green-700">
                Product successfully added to your cart.
              </p>
            )}

            {/* Service Benefits */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-gray-200 pt-8">

              <div className="text-center">
                <FaCheckCircle className="mx-auto text-xl text-[#b99b65]" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider sm:text-xs">
                  Quality
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  Product Details
                </p>
              </div>

              <div className="text-center">
                <FaTruck className="mx-auto text-xl text-[#b99b65]" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider sm:text-xs">
                  Delivery
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  Shipping Info
                </p>
              </div>

              <div className="text-center">
                <FaUndoAlt className="mx-auto text-xl text-[#b99b65]" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider sm:text-xs">
                  Support
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  Customer Care
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
