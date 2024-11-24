const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  street: String,
  city: String,
  province: String,  
});

const productSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
  deleted: Boolean,
  createdAt: Date,
  updatedAt: Date,
  __v: Number
});

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  role: String,
  address: [addressSchema]
});

const orderItemSchema = new mongoose.Schema({
  _id: String,
  product: productSchema,
  user: userSchema,
  quantity: Number,
  __v: Number
});

const orderSchema = new mongoose.Schema({
  userid: String,
  items: [orderItemSchema],
  totalAmount: Number,
  paymentMethod: String,
  selectedAddress: addressSchema,
  status: {type: String, default: 'pending'}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
