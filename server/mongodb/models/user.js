const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tags: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
