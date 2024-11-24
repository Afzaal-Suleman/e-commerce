const express = require('express');
const routerCart = express.Router();
const { createCart, selectCartItems, deleteCartItem, updateCartItem, deleteAllCartItem } = require('../controllers/Cart');

routerCart.post('/createcart', createCart)
routerCart.get('/selectcartitems/:id', selectCartItems)
routerCart.delete('/deletecartitem/:id', deleteCartItem)
routerCart.put('/updatecartItem/:id', updateCartItem)
routerCart.delete('/deleteallcartitem/:id', deleteAllCartItem)

exports.routerCart = routerCart;

