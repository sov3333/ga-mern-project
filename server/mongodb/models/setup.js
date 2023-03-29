import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    userId: { type: String },
    user: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    products: [
      {
        type: { type: String },
        brand: { type: String },
        model: { type: String },
      },
    ],
    swipes: [
      {
        userId: { type: String },
        liked: { type: Boolean },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Setup = mongoose.model('Setup', setupSchema);

export default Setup;
