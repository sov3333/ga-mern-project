import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    ratings: [{ user: String, rating: Number }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
