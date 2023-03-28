import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    user: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: [String], required: true },
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
