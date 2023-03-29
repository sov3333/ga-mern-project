import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    user: { type: String },
    img: { type: String },
    type: { type: String },
    brand: { type: String },
    model: { type: String },
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
