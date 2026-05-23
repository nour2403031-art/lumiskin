const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart:     { type: [cartItemSchema], default: [] }
});

module.exports = mongoose.model('User', userSchema);