const mongoose = require('mongoose');
const { Schema } = mongoose;

 
const CartSchema = new Schema({
    product: {
       type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

exports.Cart = mongoose.model('Cart', CartSchema);

