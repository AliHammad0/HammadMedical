
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dosage: { type: String, trim: true },
    price: { type: Number, required: true, default: 0 },
    expiryDate: { type: Date },
    stock: { type: Number, required: true, default: 0 },
    prescriptionRequired: { type: Boolean, default: false },
    image: { type: String, trim: true },

    sku: { type: String, unique: true, sparse: true, trim: true },
    manufacturer: { type: String, trim: true },
    supplier: { type: String, trim: true },
    batchNumber: { type: String, trim: true },
    weight: { type: Number },
    dimensions: { type: String, trim: true },
    unit: { type: String, trim: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;