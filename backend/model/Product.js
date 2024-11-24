const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Title is required']},
    description: {type: String, required: true},
    price: {type: Number, min:[0, 'wrong min price'], max: [1000000, 'wrong max price']},
    discountPercentage: {type: Number, min:[1, 'wrong min discount'], max: [100, 'wrong max discount']},
    rating: {type: Number, min:[0, 'wrong min rating'], max: [5, 'wrong max rating'], default:0},
    stock: {type: Number, min:[0, 'wrong min stock'], default:0},
    brand: {type: String},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true},
    images: {type: [String], required: true},
    deleted: {type: Boolean, default: false},
}, {timestamps: true})

exports.Product = mongoose.model('Product', ProductSchema)