import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    ratings: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true }, // added in the rating and review (weiliang)
      },
    ],
    reviews: [
      {
        user: { type: String, required: true },
        review: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
