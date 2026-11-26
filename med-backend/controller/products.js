
import Product from '../models/products.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: products.length === 0 ? 'No products found' : 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      dosage,
      price,
      expiryDate,
      stock,
      prescriptionRequired,
      image,
      sku,
      manufacturer,
      supplier,
      batchNumber,
      weight,
      dimensions,
      unit,
      discount,
      rating,
      reviews,
      isAvailable,
      isFeatured,
    } = req.body;

    // Required fields validation
    if (!name || !category || !description || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, description, and price are required.',
      });
    }

    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative.',
      });
    }

    if (stock !== undefined && Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock cannot be negative.',
      });
    }

    const newProduct = new Product({
      name,
      brand,
      category,
      description,
      dosage,
      price,
      expiryDate,
      stock,
      prescriptionRequired,
      image,
      sku,
      manufacturer,
      supplier,
      batchNumber,
      weight,
      dimensions,
      unit,
      discount,
      rating,
      reviews,
      isAvailable,
      isFeatured,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully!',
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single product by ID
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      'name',
      'brand',
      'category',
      'description',
      'dosage',
      'price',
      'expiryDate',
      'stock',
      'prescriptionRequired',
      'image',
      'sku',
      'manufacturer',
      'supplier',
      'batchNumber',
      'weight',
      'dimensions',
      'unit',
      'discount',
      'rating',
      'reviews',
      'isAvailable',
      'isFeatured',
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
