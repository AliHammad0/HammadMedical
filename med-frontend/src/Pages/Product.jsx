
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlices";

import {
  FaSearch,
  FaArrowRight,
  FaStar,
  FaSlidersH,
  FaShieldAlt,
  FaBoxOpen,
  FaShoppingCart
} from "react-icons/fa";

const ProductList = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.category).filter(Boolean))
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const term = search.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(term) ||
        product.brand?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.manufacturer?.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "featured") {
      result.sort(
        (a, b) => Number(b.isFeatured) - Number(a.isFeatured)
      );
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-PK");

  const getDiscountedPrice = (product) => {
    const price = Number(product.price || 0);
    const discount = Number(product.discount || 0);

    return discount > 0
      ? price - (price * discount) / 100
      : price;
  };

  // ADD TO CART FUNCTION
  const handleAddToCart = (product) => {
    if (!product.isAvailable || Number(product.stock) <= 0) {
      alert("Sorry! This product is out of stock.");
      return;
    }

    const discountedPrice = getDiscountedPrice(product);

    dispatch(
      addToCart({
        ...product,
        price: discountedPrice,
        originalPrice: Number(product.price || 0)
      })
    );

    alert(`${product.name} added to cart successfully!`);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-5 bg-[#faf9f6] font-[Arial]">
        <div className="w-11 h-11 border-[3px] border-[#e8e2d8] border-t-[#a88b5b] rounded-full animate-spin" />

        <p className="text-[11px] uppercase tracking-[3px] text-[#77736b]">
          Preparing your collection
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#faf9f6] text-[#202c35] font-[Arial]">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#172832]">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute -right-20 -top-32 w-[500px] h-[500px] border border-white rounded-full" />
          <div className="absolute -right-5 -top-16 w-[370px] h-[370px] border border-white rounded-full" />
          <div className="absolute right-20 top-10 w-[220px] h-[220px] border border-white rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-7">
              <span className="w-9 h-px bg-[#c5a675]" />

              <p className="text-[#c5a675] text-[10px] md:text-xs uppercase tracking-[4px] font-semibold">
                The Medicare Collection
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.12] font-semibold tracking-tight text-white">
              Wellness begins

              <span className="block text-[#c5a675] font-normal italic mt-2">
                with better care.
              </span>
            </h1>

            <p className="mt-7 text-sm md:text-base text-gray-300 leading-8 max-w-xl">
              Discover thoughtfully selected healthcare essentials,
              medical supplies and everyday wellness products.
            </p>

            <div className="flex flex-wrap items-center gap-8 mt-10 pt-7 border-t border-white/15">

              <div>
                <p className="text-2xl text-white font-semibold">
                  {products.length}+
                </p>

                <p className="text-[10px] text-gray-400 uppercase tracking-[2px] mt-2">
                  Products
                </p>
              </div>

              <div className="w-px h-10 bg-white/20" />

              <div>
                <p className="text-2xl text-white font-semibold">
                  {categories.length - 1}
                </p>

                <p className="text-[10px] text-gray-400 uppercase tracking-[2px] mt-2">
                  Categories
                </p>
              </div>

              <div className="w-px h-10 bg-white/20" />

              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-[#c5a675] text-xl" />

                <p className="text-xs text-gray-300 leading-5">
                  Carefully selected
                  <br />
                  healthcare essentials
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Collection Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#a88b5b]" />

              <p className="text-[#a88b5b] text-[10px] font-bold uppercase tracking-[3px]">
                Discover Our Selection
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#172832]">
              The Collection
            </h2>

            <p className="text-sm text-[#85827c] mt-3">
              Healthcare essentials selected with care.
            </p>
          </div>

          <p className="text-xs tracking-wide text-[#77736b]">
            DISPLAYING{" "}
            <span className="text-[#172832] font-bold">
              {filteredProducts.length}
            </span>{" "}
            OF{" "}
            <span className="text-[#172832] font-bold">
              {products.length}
            </span>{" "}
            PRODUCTS
          </p>

        </div>

        {/* Search and Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-8">

          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a88b5b] text-sm" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands or categories..."
              className="w-full h-14 pl-12 pr-5 bg-white border border-[#e9e5dd] text-sm text-[#202c35] placeholder:text-[#aaa69e] outline-none focus:border-[#a88b5b] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 bg-white border border-[#e9e5dd] px-4">
            <FaSlidersH className="text-[#a88b5b] text-sm" />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-14 min-w-[180px] bg-transparent text-xs text-[#4b5358] outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-5 mb-12 border-b border-[#e9e5dd]">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 whitespace-nowrap text-[10px] uppercase tracking-[1.5px] font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#172832] text-white"
                  : "bg-white text-[#77736b] border border-[#e9e5dd] hover:border-[#a88b5b] hover:text-[#172832]"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (

          <div className="py-28 text-center bg-white border border-[#eee9e0]">

            <FaBoxOpen className="text-4xl text-[#b6a88f] mx-auto mb-6" />

            <h3 className="text-2xl font-semibold text-[#172832]">
              No Products Found
            </h3>

            <p className="text-sm text-[#85827c] mt-3">
              We couldn't find products matching your search.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-7 px-7 py-3 bg-[#172832] text-white text-[10px] uppercase tracking-[2px] hover:bg-[#a88b5b] transition-colors"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">

            {filteredProducts.map((product) => {

              const discountedPrice = getDiscountedPrice(product);

              const isOutOfStock =
                !product.isAvailable || Number(product.stock) <= 0;

              return (

                <div
                  key={product._id}
                  className="group block"
                >

                  {/* Product Image */}
                  <Link
                    to={`/products/${product._id}`}
                    className="block"
                  >

                    <div className="relative aspect-[4/4.5] bg-[#f0eee8] overflow-hidden">

                      <img
                        src={
                          product.image ||
                          "https://placehold.co/500x500/f0eee8/77736b?text=Healthcare+Product"
                        }
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-9 transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {product.isFeatured && (
                        <span className="absolute top-4 left-4 bg-[#172832] text-white px-4 py-2 text-[9px] uppercase tracking-[1.5px] font-semibold">
                          Featured
                        </span>
                      )}

                      {product.discount > 0 && (
                        <span className="absolute top-4 right-4 bg-white text-[#a34e3f] px-3 py-2 text-[10px] font-bold">
                          {product.discount}% OFF
                        </span>
                      )}

                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-[#faf9f6]/75 flex items-center justify-center">
                          <span className="bg-[#172832] text-white px-6 py-3 text-[10px] uppercase tracking-[2px] font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 bg-[#172832] text-white py-4 px-5 flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] uppercase tracking-[2px] font-semibold">
                          Discover Product
                        </span>

                        <FaArrowRight className="text-[#c5a675] text-sm" />
                      </div>

                    </div>

                  </Link>

                  {/* Product Information */}
                  <div className="pt-5">

                    <div className="flex items-center justify-between gap-3 mb-3">

                      <p className="text-[10px] text-[#a88b5b] font-bold uppercase tracking-[2px]">
                        {product.brand || product.manufacturer || "Medicare"}
                      </p>

                      {product.rating > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-[#77736b]">
                          <FaStar className="text-[#b8955b]" />

                          {Number(product.rating).toFixed(1)}

                          <span className="text-[#aaa69e]">
                            ({product.reviews || 0})
                          </span>
                        </span>
                      )}

                    </div>

                    <Link
                      to={`/products/${product._id}`}
                      className="block"
                    >

                      <h3 className="text-base font-semibold text-[#172832] leading-6 group-hover:text-[#a88b5b] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                    </Link>

                    <p className="text-xs text-[#85827c] mt-2 leading-6 line-clamp-2 min-h-[48px]">
                      {product.description || "Explore this healthcare essential from our collection."}
                    </p>

                    {/* Price */}
                    <div className="mt-5 pt-4 border-t border-[#e9e5dd]">

                      <div className="flex items-center justify-between">

                        <div>

                          {product.discount > 0 && (
                            <p className="text-[11px] text-[#aaa69e] line-through mb-1">
                              Rs. {formatPrice(product.price)}
                            </p>
                          )}

                          <p className="text-lg font-semibold text-[#172832]">
                            Rs. {formatPrice(discountedPrice)}
                          </p>

                        </div>

                        <span className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#a88b5b]">
                          {isOutOfStock ? "Unavailable" : "Available"}
                        </span>

                      </div>

                    </div>

                    {/* Add To Cart Button */}
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => handleAddToCart(product)}
                      className={`w-full mt-5 py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[2px] font-bold transition-all duration-300 ${
                        isOutOfStock
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#172832] text-white hover:bg-[#a88b5b]"
                      }`}
                    >

                      <FaShoppingCart className="text-sm" />

                      {isOutOfStock ? "Out of Stock" : "Add To Cart"}

                    </button>

                    {product.prescriptionRequired && (
                      <p className="text-[10px] text-[#9b7041] mt-3 tracking-wide">
                        Prescription Required
                      </p>
                    )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

      {/* Trust Section */}
      <div className="bg-[#172832]">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">

            <div className="max-w-2xl">

              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-[#c5a675]" />

                <p className="text-[#c5a675] text-[10px] uppercase tracking-[3px] font-semibold">
                  The Medicare Standard
                </p>
              </div>

              <h3 className="text-3xl md:text-4xl text-white font-semibold leading-tight">
                Thoughtful care.

                <span className="text-[#c5a675] italic font-normal">
                  {" "}Everyday wellness.
                </span>
              </h3>

              <p className="text-sm text-gray-400 mt-5 leading-8 max-w-xl">
                Explore our collection of healthcare essentials and discover
                products designed to support your everyday wellbeing.
              </p>

            </div>

            <div className="w-24 h-24 border border-[#c5a675]/40 rounded-full flex items-center justify-center shrink-0">
              <FaShieldAlt className="text-[#c5a675] text-3xl" />
            </div>

          </div>

          <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">

            <p className="text-[9px] text-gray-500 uppercase tracking-[2px]">
              Medicare Healthcare Collection
            </p>

            <p className="text-[9px] text-gray-500 uppercase tracking-[2px]">
              Care • Quality • Wellness
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProductList;
