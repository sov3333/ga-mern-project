import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  tags: [{ type: String }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  username: { type: String, trim: true },
  swipedSetups: [
    {
      setupId: { type: String },
      liked: { type: Boolean },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// UserSchema.post('save', function (doc, ext) {
//   console.log('from userSchema, new user was created & saved', doc);
//   next();
// });

// hash password before user is saved
// UserSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model('User', UserSchema);

export default User;
