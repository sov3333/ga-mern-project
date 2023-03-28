import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    user: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    products: { type: [String] },
    swipes: [
      {
        userId: { type: String },
        liked: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

const Setup = mongoose.model('Setup', setupSchema);

export default Setup;
