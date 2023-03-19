import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    user: { type: String, required: true },
    products: { type: [String], required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

const Setup = mongoose.model('Setup', setupSchema);
const Product = mongoose.model('Product', productSchema);

export default { Setup, Product };
