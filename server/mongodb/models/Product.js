import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    img: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    ratings: [
      {
        user: { type: String },
        rating: { type: Number }, // added in the rating and review (weiliang)
      },
    ],
    reviews: [
      {
        user: { type: String },
        review: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
